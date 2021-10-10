const { describe, it } = require("mocha");
const supertest = require("supertest");
const { app } = require("./api");
const { deepStrictEqual, ok } = require("assert");

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

  describe("/login", () => {
    it("should login successfully on the login route and return HTTP status 200", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "gabrielrocha", password: "123" })
        .expect(200);
      deepStrictEqual(response.text, "Login has succeeded!");
    });

    it("should fail login and return HTTP status 401", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "invalid", password: "wrong" })
        .expect(401);

      ok(response.unauthorized);
      deepStrictEqual(response.text, "Login failed!");
    });
  });
});
