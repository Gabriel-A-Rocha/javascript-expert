// @ts-check

import { createServer } from "http";
import { BusinessError } from "./errors/businessError.js";
import { statusCodes } from "./utils/httpStatusCodes.js";

/**
 * Validation for request payload
 * @param {object} hero {name: "Batman", age: 39}
 */
function validateHero(hero) {
  if (hero.age < 20) {
    throw new BusinessError("Age must be greater than 20!");
  }
  if (hero.name?.length < 2) {
    throw new BusinessError("Name must have at least 2 characters!");
  }
  if (Reflect.has(hero, "connectionError")) {
    throw new Error("Database connection error!");
  }
}

async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data);
      validateHero(hero);

      response.writeHead(statusCodes.OK);
      response.end();
    } catch (error) {
      if (error instanceof BusinessError) {
        response.writeHead(statusCodes.BAD_REQUEST);
        response.end(error.message);
        continue;
      }

      response.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
      response.end("Internal server problem!");
    }
  }
}

createServer(handler).listen(3000, () => console.log("Server listening at port 3000"));
