import { ContextStrategy } from "./src/base/contextStrategy.js";
import { MongoDBStrategy } from "./src/strategies/mongodbStrategy.js";
import { PostgresStrategy } from "./src/strategies/postgresStrategy.js";

const postgresStrategy = new ContextStrategy(new PostgresStrategy());
postgresStrategy.connect();

const data = [
  {
    name: "John Doe",
    type: "transaction",
  },
  {
    name: "Jane Doe",
    type: "activityLog",
  },
];
