export class PostgresStrategy {
  constructor(dbStrategy) {
    this.dbStrategy = dbStrategy;
  }

  connect() {
    console.log("connecting...");
  }

  create(item) {}

  read(item) {}
}
