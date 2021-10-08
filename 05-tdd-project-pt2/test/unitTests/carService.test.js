const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { CarService } = require("../../src/service/carService");
const { join } = require("path");
const { expect } = require("chai");
const sinon = require("sinon");

const carsDatabase = join(__dirname, "..", "..", "database", "cars.json");

const mocks = {
  validCarCategory: require("../mocks/valid-carCategory.json"),
  validCar: require("../mocks/valid-car.json"),
  validCustomer: require("../mocks/valid-customer.json"),
};

describe("CarService Test Suite", () => {
  let carService = {};
  let sandbox = {};
  before(() => {
    carService = new CarService({ cars: carsDatabase });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox = sinon.restore();
  });

  it("should retrieve a random position from an array", () => {
    const data = [0, 1, 2, 3, 4];
    const result = carService.getRandomPositionFromArray(data);
    expect(result).to.be.lt(data.length).and.be.gte(0);
  });

  it("should retrieve the first id from carIds in carCategory", () => {
    const carCategory = mocks.validCarCategory;
    // the randomness was already tested, return must now be predictable
    const carIndex = 0;
    sandbox.stub(carService, "getRandomPositionFromArray").returns(carIndex);

    const result = carService.chooseRandomCar(carCategory);
    const expected = carCategory.carIds[carIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  });

  it("given a car category it should return an available car", async () => {
    const car = mocks.validCar;
    // Object.create prevents the parent object from being changed
    const carCategory = Object.create(mocks.validCarCategory);
    // avoid randomness by assigning a single car to the category
    carCategory.carIds = [car.id];
    // remove database dependency
    sandbox.stub(carService.carRepository, "find").resolves(car);
    sandbox.spy(carService, "chooseRandomCar");

    const result = await carService.getAvailableCar(carCategory);
    const expected = car;

    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok;
    expect(result).to.be.deep.equal(expected);
  });
});
