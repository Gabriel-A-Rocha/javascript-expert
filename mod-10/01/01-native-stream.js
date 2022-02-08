// @ts-check

import process from "process";

/* process.stdin
  .on("data", (msg) => console.log("input received: ", msg.toString()))
  .on("error", (err) => console.log("err", err.toString()))
  .on("end", () => console.log("end"))
  .on("close", () => console.log("close"));
 */

// terminal 1 - Server
// node -e "require('net').createServer((socket) => socket.pipe(process.stdout)).listen(1338)"

// terminal 2 - Client
// node -e "process.stdin.pipe(require('net').connect(1338))"

// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import http from "http";
import { createReadStream, readFileSync } from "fs";

http
  .createServer((req, res) => {
    // bad practice
    // const file = readFileSync("big.file").toString();

    createReadStream("big.file").pipe(res);

    res.statusCode = 200;
    res.end();
  })
  .listen(3000, () => console.log("Running at port 3000"));
