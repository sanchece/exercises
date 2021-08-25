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

    test("It should respond with array of companies", async function () {
      const response = await request(app).get("/companies");
      expect(response.body).toEqual({
        "companies": [
            {code: "google", name: "Google"},
          {code: "skynet", name: "Skynet"},
          
        ]
      });
    })
  
  });
  
  
describe("GET /skynet", function () {

  test("It return company info", async function () {
    const response = await request(app).get("/companies/skynet");
    expect(response.body).toEqual(
        {
          "company": {
            code: "skynet",
            name: "Skynet",
            description: "Artificial superintelligent neural network system",
            invoices: [1, 2],
          }
        }
    );
  });
  test("It should return 404 for no-such-company", async function () {
    const response = await request(app).get("/companies/blargh");
    expect(response.status).toEqual(404);
  })
  });

  describe("POST /", function () {

    test("It should add company", async function () {
      const response = await request(app)
          .post("/companies")
          .send({name: "TacoTime", description: "Yum!"});
  
      expect(response.body).toEqual(
          {
            "company": {
              code: "tacotime",
              name: "TacoTime",
              description: "Yum!",
            }
          }
      );
    });

    test("It should return 500 for conflict", async function () {
      const response = await request(app)
          .post("/companies")
          .send({name: "Skynet", description: "Huh?"});
  
      expect(response.status).toEqual(500);
    })
  });

  describe("PUT /", function () {

    test("It should update company", async function () {
      const response = await request(app)
          .put("/companies/skynet")
          .send({name: "SkynetEdit", description: "NewDescrip"});
  
      expect(response.body).toEqual(
          {
            "company": {
              code: "skynet",
              name: "SkynetEdit",
              description: "NewDescrip",
            }
          }
      );
    });
  
    test("It should return 404 for no-such-comp", async function () {
      const response = await request(app)
          .put("/companies/blargh")
          .send({name: "Blargh"});
  
      expect(response.status).toEqual(404);
    });
  
    test("It should return 500 for missing data", async function () {
      const response = await request(app)
          .put("/companies/skynet")
          .send({});
  
      expect(response.status).toEqual(500);
    })
  });
  

  

describe("DELETE /", function () {

  test("It should delete company", async function () {
    const response = await request(app)
        .delete("/companies/skynet");

    expect(response.body).toEqual({"status": "deleted"});
  });

  test("It should return 404 for no-such-comp", async function () {
    const response = await request(app)

        .delete("/companies/blargh");

    expect(response.status).toEqual(404);
  });
});

