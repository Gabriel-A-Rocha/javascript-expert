import { MongoClient } from "mongodb";

async function dbConnect() {
  // connection URL
  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url);

  await client.connect();
  console.log("Connected to MongoDB server");

  // database name
  const dbName = "comics";

  const db = client.db(dbName);
  return {
    collections: {
      heroes: db.collection("heroes"),
      client,
    },
  };
}

try {
  const { collections, client } = await dbConnect();

  await collections.heroes.insertOne({
    name: "Flash",
    updatedAt: new Date().toISOString(),
  });

  const heroes = await collections.heroes.find({}).toArray();
} catch (error) {
  console.log(error);
}
