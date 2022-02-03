import { MongoClient } from "mongodb";
import { createServer } from "http";
import { promisify } from "util";

async function dbConnect() {
  // connection URL
  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url);
  await client.connect();
  console.log("Connected to MongoDB server");

  const dbName = "comics";
  const collectionName = "heroes";
  const db = client.db(dbName);
  return {
    collections: {
      heroes: db.collection(collectionName),
    },
    client,
  };
}

const { collections, client } = await dbConnect();

async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data);
      await collections.heroes.insertOne({
        ...hero,
        updatedAt: new Date().toISOString(),
      });
      const heroes = await collections.heroes.find({}).toArray();
      response.writeHead(201);
      response.write(JSON.stringify(heroes));
    } catch (error) {
      console.log("Error with the incoming request", error);
      response.writeHead(500);
      response.write(JSON.stringify({ message: "Internal server error" }));
    } finally {
      response.end();
    }
  }
}

const server = createServer(handler).listen(3000, () => {
  console.log({ status: "Server listening at port 3000", processId: process.pid });
});

const onStop = async (signal) => {
  console.log(`\n${signal} signal received!`);

  console.log("HTTP server stopping...");
  await promisify(server.close.bind(server))();
  console.log("HTTP server stopped!");

  console.log("MongoDB connection stopping...");
  await client.close();
  console.log("MongoDB connection stopped!");

  process.exit(0);
};

["SIGINT", "SIGTERM"].forEach((event) => process.on(event, onStop));
