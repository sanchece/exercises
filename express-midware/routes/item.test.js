process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
let items = require("../fakeDB")

let item = { name: "chocolate_cake", price:34.99 }

beforeEach(async () => {
  items.push(item)
});
afterEach(async () => {
  items.length=0;
});

describe("GET /items", function () {
  test("gets all items", async function () {
    const res = await request(app).get(`/items`);
    const { items } = res.body;
    expect(items).toHaveLength(2);
    expect(res.statusCode).toBe(200);

  });
});

describe("GET /items/:name",  function () {
  test("Gets one item", async function () {
    const res = await request(app).get(`/items/${item.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.item).toEqual(item);
  });

});

describe("POST /items",  function () {
  test("Creates a new item", async function () {
    const res = await request(app)
      .post(`/items`)
      .send({
        name: "beer",
        price: 3
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.item).toHaveProperty("name");
    expect(res.body.item).toHaveProperty("price");
    expect(res.body.item.name).toEqual("beer");
    expect(res.body.item.price).toEqual(3);
  });
});

describe("PATCH /items/:name",  function () {
  test("Updates the item", async function () {
    const response = await request(app)
      .patch(`/items/${item.name}`)
      .send({
        name: "beer",
        price:4
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual({
      name: "beer",
      price:4
    });
  });

});

describe("DELETE /items/:name",  function () {
  test("Deletes a single a item", async function () {
    const response = await request(app)
      .delete(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Deleted" });
  });
});


