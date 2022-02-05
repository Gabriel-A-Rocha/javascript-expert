import { createServer } from "http";

async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data);

      response.writeHead(200);
      response.end();
    } catch (error) {
      response.writeHead(500);
      response.end();
    }
  }
}

createServer(handler).listen(3000, () => console.log("Server listening at port 3000"));
