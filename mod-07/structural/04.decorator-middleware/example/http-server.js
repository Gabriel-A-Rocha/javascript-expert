import http from "http";

function handleRequest(req, res) {
  res.setHeader("X-Instrumented-By", "Gabriel Rocha");
  res.end("Hello world");
}

const server = http.createServer(handleRequest);
const port = 3000;

server.listen(port, () => console.log("Server running at", server.address().port));
