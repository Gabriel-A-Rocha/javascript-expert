const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { CarService } = require("../../src/service/carService");
const { join } = require("path");
const { expect } = require("chai");
const sinon = require("sinon");
const { Transaction } = require("../../src/entities/transaction");

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
    sandbox.restore();
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
    // Object.create prevents the parent object (reliable mock) from being changed
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

  it("given a category, customer, and number of days, it should calculate the final amount in R$", () => {
    const customer = Object.create(mocks.validCustomer);
    customer.age = 50;

    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.price = 37.6;

    const numberOfDays = 5;

    sandbox.stub(carService, "taxesBasedOnAge").get(() => [{ from: 31, to: 100, then: 1.3 }]);

    const expected = carService.currencyFormat.format(244.4);
    const result = carService.calculateFinalPrice(customer, carCategory, numberOfDays);

    expect(result).to.be.deep.equal(expected);
  });

  it("given a customer and a car category it should return a transaction receipt", async () => {
    const car = mocks.validCar;
    const carCategory = { ...mocks.validCarCategory, price: 37.6, carIds: [car.id] };
    const customer = { ...mocks.validCustomer, age: 20 };
    const numberOfDays = 5;

    const dueDate = "10 de novembro de 2020";

    const now = new Date(2020, 10, 5);

    // new Date() becomes the date specified (predictable test)
    sandbox.useFakeTimers(now.getTime());

    const expectedAmount = carService.currencyFormat.format(206.8);
    const result = await carService.rent(customer, carCategory, numberOfDays);

    const expected = new Transaction({
      customer,
      car,
      amount: expectedAmount,
      dueDate,
    });

    expect(result).to.be.deep.equal(expected);
  });
});
