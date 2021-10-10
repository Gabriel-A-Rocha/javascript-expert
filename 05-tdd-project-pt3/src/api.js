const http = require("http");
const { CarService } = require("./service/carService");
const { join } = require("path");
const { BaseRepository } = require("./repository/base/baseRepository");

const routes = {
  "/randomcar:get": async (req, res) => {
    const carCategoryId = req.query.split("=")[1];

    const carCategoryDatabase = join(__dirname, "..", "database", "carCategories.json");
    const carCategoryRepository = new BaseRepository({ file: carCategoryDatabase });
    const carCategory = await carCategoryRepository.find(carCategoryId);

    const carsDatabase = join(__dirname, "..", "database", "cars.json");
    const carService = new CarService({ cars: carsDatabase });
    const car = carService.chooseRandomCar(carCategory);

    res.write(JSON.stringify({ car }));
    return res.end();
  },

  default: async (req, res) => {
    res.write(JSON.stringify({ message: "no route found" }));
    return res.end();
  },
};

const handler = async (req, res) => {
  const { url, method } = req;

  const endpoint = url.split("?")[0];

  const query = url.split("?")[1];
  req.query = query;

  const routeKey = `${endpoint}:${method}`.toLowerCase();
  const route = routes[routeKey] || routes["default"];

  res.writeHead(200, "OK", {
    "Content-Type": "application/json",
  });

  return route(req, res);
};

const server = http.createServer(handler);

const port = 4545;
server.listen(port, () => console.log(`server listening at port ${port}`));

module.exports = { server };
