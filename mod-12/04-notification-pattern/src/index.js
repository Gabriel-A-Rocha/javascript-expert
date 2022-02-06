// @ts-check

import { createServer } from "http";
import { HeroEntity } from "./heroEntity.js";
import { statusCodes } from "./utils/httpStatusCodes.js";

async function handler(request, response) {
  for await (const data of request) {
    try {
      const parsedData = JSON.parse(data);

      if (Reflect.has(parsedData, "connectionError")) {
        throw new Error("Database connection error!");
      }

      const hero = new HeroEntity(parsedData);

      if (!hero.isValid()) {
        response.writeHead(statusCodes.BAD_REQUEST);
        response.end(JSON.stringify(hero.notifications));
        continue;
      }

      response.writeHead(statusCodes.OK);
      response.end(
        JSON.stringify({
          name: hero.name,
          age: hero.age,
        })
      );
    } catch (error) {
      console.log(error);
      response.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
      response.end("Internal server problem!");
    }
  }
}

createServer(handler).listen(3000, () => console.log("Server listening at port 3000"));
