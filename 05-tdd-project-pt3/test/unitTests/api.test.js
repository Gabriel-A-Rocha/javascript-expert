const { describe, it, beforeEach } = require("mocha");
const { server } = require("../../src/api");
const supertest = require("supertest");
const { expect } = require("chai");
const { createSandbox } = require("sinon");
const { CarService } = require("../../src/service/carService");

const mocks = {
  validCar: require("../mocks/valid-car.json"),
  validCarCategory: require("../mocks/valid-carCategory.json"),
};

describe("API test suite", () => {
  let sandbox = {};

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /* it("should contact an invalid route and receive 'no route found' text", async () => {
    const response = await supertest(server).get("/invalid");
    expect(response).to.be.deep.equal({ message: "no route found" });
  });

  it("given a car category as url param, API should return a car Id", async () => {
    const car = mocks.validCar;

    const response = await supertest(server).get("/randomCar").query({
      carCategoryId: mocks.validCarCategory.id,
    });

    expect(response).to.be.deep.equal(car.id);
  }); */
});
