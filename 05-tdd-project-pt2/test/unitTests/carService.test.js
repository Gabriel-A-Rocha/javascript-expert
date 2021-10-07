const { describe, it, before } = require("mocha");
const { CarService } = require("../../src/service/carService");
const { join } = require("path");
const assert = require("assert");

const carsDatabase = join(__dirname, "..", "..", "database", "cars.json");

const mocks = {
  validCarCategory: require("../mocks/valid-carCategory.json"),
  validCar: require("../mocks/valid-car.json"),
  validCustomer: require("../mocks/valid-customer.json"),
};

describe("CarService Test Suite", () => {
  let carService = {};
  before(() => {
    carService = new CarService({ cars: carsDatabase });
  });

  it("given a car category it should return an available car", async () => {
    const car = mocks.validCar;
    // Object.create prevents the parent object from being changed
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.carIds = [car.id];

    const result = await carService.getAvailableCar(carCategory);
    const expected = car;
  });
});
