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
