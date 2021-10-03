const faker = require("faker");
const { join } = require("path");
const { writeFile } = require("fs/promises");
const { Car } = require("../src/entities/car");
const { CarCategory } = require("../src/entities/carCategory");
const { Customer } = require("../src/entities/customer");

const seederBaseFolder = join(__dirname, "..", "database");

const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),
  price: faker.finance.amount(20, 100),
  carIds: [],
});

const cars = [];
const customers = [];
for (let i = 0; i < ITEMS_AMOUNT; i++) {
  const car = new Car({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.between(1980, 2020).getFullYear(),
  });
  carCategory.carIds.push(car.id);
  cars.push(car);

  const customer = new Customer({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    age: faker.datatype.number({ min: 18, max: 100 }),
  });
  customers.push(customer);
}

const write = async (filename, data) => {
  const filePath = join(seederBaseFolder, filename);
  writeFile(filePath, JSON.stringify(data));
};

(async () => {
  await write("cars.json", cars);
  await write("carCategories.json", [carCategory]);
  await write("customers.json", customers);

  console.log("cars", cars);
  console.log("carCategories", carCategory);
  console.log("customers", customers);
})();
