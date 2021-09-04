process.env.NODE_ENV = "test"

const request = require("supertest");
const app = require("../app");
const db = require("../db");


let sampleBook;
beforeEach(async () => {
  let result =  db.query(`
    INSERT INTO 
      books (isbn, amazon_url,author,language,pages,publisher,title,year)   
      VALUES(
        '1234', 
        'https://amazon.com/jeff', 
        'jeff', 
        'Spanish', 
        123,  
        'amazon', 
        'how to be like jef', 2020) 
      RETURNING isbn`);

      sampleBook = result.rows[0].isbn
});

describe("POST /books",  function () {
    test("Add new book", async function () {
      const response = await request(app)
          .post(`/books`)
          .send({
            isbn: '1235',
            amazon_url: "https://amazon.com/jeff2",
            author: "jeff",
            language: "Spanish",
            pages: 124,
            publisher: "amazon",
            title: "how to be like jeff 2",
            year: 2021
          });
      expect(response.statusCode).toBe(201);
      expect(response.body.book).toHaveProperty("isbn");
    });
  
  });
  
  
  describe("GET /books",  function () {
    test("Gets list of books", async function () {
      const response = await request(app).get(`/books`);
      const books = response.body.books;
      expect(books).toHaveLength(1);
      expect(books[0]).toHaveProperty("isbn");
      expect(books[0]).toHaveProperty("amazon_url");
    });
  });
  
  
  describe("GET /books/:isbn",  function () {
    test("Gets a single book", async function () {
      const response = await request(app)
          .get(`/books/${sampleBook}`)
      expect(response.body.book).toHaveProperty("isbn");
      expect(response.body.book.isbn).toBe(sampleBook);
    });
  
    test("Responds with 404 if can't find book in question", async function () {
      const response = await request(app)
          .get(`/books/999`)
      expect(response.statusCode).toBe(404);
    });
  });
  
  
  describe("PUT /books/:id",  function () {
    test("Updates a single book", async function () {
      const response = await request(app)
          .put(`/books/${sampleBook}`)
          .send({
            amazon_url: "https://amazon.com/jeff2",
            author: "jeff",
            language: "Spanish",
            pages: 124,
            publisher: "amazon",
            title: "how to be like jeff 2",
            year: 2021
          });
      expect(response.body.book).toHaveProperty("isbn");
      expect(response.body.book.title).toBe("UPDATED BOOK");
    });
  
    test("Responds 404 if can't find book in question", async function () {
      await request(app)
          .delete(`/books/${sampleBook}`)
      const response = await request(app).delete(`/books/${sampleBook}`);
      expect(response.statusCode).toBe(404);
    });
  });
  
  
  describe("DELETE /books/:id", function () {
    test("Deletes a single a book", async function () {
      const response = await request(app)
          .delete(`/books/${sampleBook}`)
      expect(response.body).toEqual({message: "Book deleted"});
    });
  });
  
  
  afterEach(async function () {
    await db.query("DELETE FROM BOOKS");
  });
  
  
  afterAll(async function () {
    await db.end()
  });