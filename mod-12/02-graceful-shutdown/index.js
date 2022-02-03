import { MongoClient } from "mongodb";

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
  await collections.heroes.insertOne({
    name: "Flash",
    updatedAt: new Date().toISOString(),
  });
  const heroes = await collections.heroes.find({}).toArray();
  console.log("\n🪁 ~ heroes", heroes);
}

client.close();
