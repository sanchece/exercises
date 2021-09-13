"use strict";

const request = require("supertest");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("POST /jobs", function () {
  
  test("ok for admin", async function () {
    const resp = await request(app)
        .post(`/jobs`)
        .send({
          companyHandle: "c1",
          title: "terminator",
          salary: 1,
          equity: "0",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      job: {
        id: expect.any(Number),
        title: "terminator",
        salary: 1,
        equity: "0",
        companyHandle: "c1",
      },
    });
  });
})

describe("GET /jobs", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get(`/jobs`);
    expect(resp.body).toEqual({
          jobs: [
            {
              id: expect.any(Number),
              title: "1cook",
              salary: 1,
              equity: "0.1",
              companyHandle: "c1",
              companyName: "C1",
            },
            {
              id: expect.any(Number),
              title: "2cook",
              salary: 2,
              equity: "0.2",
              companyHandle: "c1",
              companyName: "C1",
            },
            {
              id: expect.any(Number),
              title: "3cook",
              salary: 3,
              equity: null,
              companyHandle: "c1",
              companyName: "C1",
            },
          ],
        },
    );
  });

  test("works: filtering", async function () {
    const resp = await request(app)
        .get(`/jobs`)
        .query({ hasEquity: true });
    expect(resp.body).toEqual({
          jobs: [
            {
              id: expect.any(Number),
              title: "1cook",
              salary: 1,
              equity: "0.1",
              companyHandle: "c1",
              companyName: "C1",
            },
            {
              id: expect.any(Number),
              title: "2cook",
              salary: 2,
              equity: "0.2",
              companyHandle: "c1",
              companyName: "C1",
            },
          ],
        },
    );
  });

  test("works: filtering on 2 filters", async function () {
    const resp = await request(app)
        .get(`/jobs`)
        .query({ minSalary: 2, title: "3cook" });
    expect(resp.body).toEqual({
          jobs: [
            {
              id: expect.any(Number),
              title: "3cook",
              salary: 3,
              equity: null,
              companyHandle: "c1",
              companyName: "C1",
            },
          ],
        },
    );
  });

});