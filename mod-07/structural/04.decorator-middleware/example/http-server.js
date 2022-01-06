import http from "http";
import { InjectHttpInterceptor } from "../src/agent.js";

InjectHttpInterceptor();

function handleRequest(req, res) {
  res.end("Hello world");
}

const server = http.createServer(handleRequest);
const port = 3000;

server.listen(port, () => console.log("Server running at", server.address().port));
