const { describe, it } = require("mocha");
const supertest = require("supertest");
const { app } = require("./api");
const { deepStrictEqual } = require("assert");

describe("API test suite", () => {
  describe("/contact", () => {
    it("should request the contact page and return HTTP status 200", async () => {
      const response = await supertest(app).get("/contact").expect(200);
      deepStrictEqual(response.text, "Contact us page");
    });
  });

  describe("/hello", () => {
    it("should request a non-existing route /hi and return HTTP status 200 with Hello World message", async () => {
      const response = await supertest(app).get("/hi").expect(200);
      deepStrictEqual(response.text, "Hello world!");
    });
  });
});
