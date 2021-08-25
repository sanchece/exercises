const request = require("supertest");
const app = require("../app");
const db = require("../db");

beforeEach(async function () {
  await db.query(`
  CREATE TABLE IF NOT EXISTS companies (
    code text PRIMARY KEY,
    name text NOT NULL UNIQUE,
    description text
);
CREATE TABLE IF NOT EXISTS invoices (
    id serial PRIMARY KEY,
    comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
    amt float NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    add_date date DEFAULT CURRENT_DATE NOT NULL,
    paid_date date,
    CONSTRAINT invoices_amt_check CHECK ((amt > (0)::double precision))
);
`);
await db.query("DELETE FROM invoices");
await db.query("DELETE FROM companies");

  await db.query(`INSERT INTO companies (code, name, description)
                    VALUES ('skynet', 'Skynet', 'Artificial superintelligent neural network system'),
                           ('google', 'Google', 'multinational technology company')`);
await db.query(
    `INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date)
           VALUES ('skynet', 900, false, '2027-07-01', null),
                  ('skynet', 800, true, '2027-08-01', '2018-08-02')
           RETURNING id,comp_code`
  );

  
});


afterEach(async function () {

  await db.query("DROP TABLE invoices");
  await db.query("DROP TABLE companies");

});

afterAll(async function () {
  // close db connection

  await db.end();
});

describe("GET /", function () {
  test("returns array of invoices", async function () {
    const response = await request(app).get("/invoices");
    expect(response.body).toEqual({
      "invoices": [
        {id: 1, comp_code: "skynet"},
        {id: 2, comp_code: "skynet"},
      ]
    });
  });
});

describe("GET /1", function () {
  test("It returns invoice info", async function () {
 
    const response = await request(app).get("/invoices/1");
    expect(response.body).toEqual(
        {
          "invoice": {
            id: 1,
            company: {
              code: "skynet",
              name: "Skynet",
              description: 
              "Artificial superintelligent neural network system",
            },
            amt: 900,
            add_date: "2027-07-01T04:00:00.000Z",
            paid: false,
            paid_date: null,
          }
        });
  });

  test("returns 404 for non-existent", async function () {
    const response = await request(app).get("/invoices/123");
    expect(response.status).toEqual(404);
  })
});

describe("POST /", function () {

  test("It should add invoice", async function () {
    const response = await request(app)
        .post("/invoices")
        .send({amt: 400, comp_code: 'skynet'});

    expect(response.body).toEqual(
        {
          "invoice": {
            id: 3,
            comp_code: "skynet",
            amt: 400,
            add_date: expect.any(String),
            paid: false,
            paid_date: null,
          }
        }
    );
  });
});

describe("PUT /", function () {

  test("It should update an invoice", async function () {
    const response = await request(app)
        .put("/invoices/1")
        .send({amt: 1000, paid: false});

    expect(response.body).toEqual(
        {
          "invoice": {
            id: 1,
            comp_code: 'skynet',
            paid: false,
            amt: 1000,
            add_date: expect.any(String),
            paid_date: null,
          }
        }
    );
  });

  test("It should return 404 for no-such-invoice", async function () {
    const response = await request(app)
        .put("/invoices/9999")
        .send({amt: 1000});
    expect(response.status).toEqual(404);
  });

  test("It should return 500 for missing data", async function () {
    const response = await request(app)
        .put("/invoices/1")
        .send({});

    expect(response.status).toEqual(500);
  })

})

describe("DELETE /", function () {

  test("It should delete invoice", async function () {
    const response = await request(app)
        .delete("/invoices/1");

    expect(response.body).toEqual({"status": "deleted"});
  });

  test("It should return 404 for no-such-invoices", async function () {
    const response = await request(app)
        .delete("/invoices/999");

    expect(response.status).toEqual(404);
  });
});

