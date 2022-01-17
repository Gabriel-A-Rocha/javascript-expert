import http from "http";

let count = 0;
async function handler(req, res) {
  count++;

  try {
    if (count % 2 === 0) {
      await Promise.reject("error inside handler");
      // 500 Internal Server Error - { message: "Internal server error" }
    }

    for await (const data of req) {
      try {
        if (count % 2 !== 0) {
          await Promise.reject("error inside for await loop");
          // Error: Server returned nothing (no headers, no data)
          res.end();
        }
      } catch (error) {
        console.log("A request error occured!", error);
        res.writeHead(500);
        res.write(JSON.stringify({ message: "REQUEST error!" }));
        res.end();
      }
    }
  } catch (error) {
    console.log("A server error occured!", error);
    res.writeHead(500);
    res.write(JSON.stringify({ message: "SERVER error!" }));
    res.end();
  }
}

http.createServer(handler).listen(3333, () => console.log("Running at port 3333"));
