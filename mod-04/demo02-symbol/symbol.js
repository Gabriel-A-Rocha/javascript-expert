const { deepStrictEqual } = require("assert");
const assert = require("assert");

// Unique Keys
const uniqueKey = Symbol("userName");

const user = {};

user["userName"] = "value for ordinary objects";
user[uniqueKey] = "value for symbol";

assert.deepStrictEqual(user["userName"], "value for ordinary objects");
assert.deepStrictEqual(user[uniqueKey], "value for symbol");
assert.deepStrictEqual(user[Symbol("userName")], undefined);

assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// Well Known Symbols
const obj = {
  [Symbol.iterator]: () => {
    return {
      items: ["c", "b", "a"],
      next() {
        return {
          done: this.items.length === 0,
          value: this.items.pop(),
        };
      },
    };
  },
};

for (let item of obj) {
  console.log("item", item);
}

assert.deepStrictEqual([...obj], ["a", "b", "c"]);

const kItems = Symbol("kItems");

class MyDate {
  constructor(...args) {
    this[kItems] = args.map((arg) => new Date(...arg));
  }

  // add coercion mechanism
  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== "string") throw new TypeError();

    const items = this[kItems].map((item) =>
      new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(item)
    );

    return new Intl.ListFormat("pt-BR", {
      style: "long",
      type: "conjunction",
    }).format(items);
  }

  // add iterator capability (for...of)
  *[Symbol.iterator]() {
    for (let i = 0; i < this[kItems].length; i++) yield this[kItems][i];
  }

  // add async iterator capability (for await...of)
  async *[Symbol.asyncIterator]() {
    const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    for (const item of this[kItems]) {
      await timeout(500);
      yield item.toISOString();
    }
  }
}

const myDate = new MyDate([2020, 0, 3], [2020, 1, 8]);

assert.throws(() => Number(myDate), TypeError);
assert.deepStrictEqual(String(myDate), "03 de janeiro de 2020 e 08 de fevereiro de 2020");

const expectedDates = [new Date(2020, 0, 3), new Date(2020, 1, 8)];

// iterator
assert.deepStrictEqual([...myDate], expectedDates);
console.log("[...myDate]", [...myDate]);

for (let date of myDate) {
  console.log("iterator - date", date);
}

// async iterator
(async () => {
  const dates = [];
  for await (let date of myDate) {
    console.log("async iterator - date", date);
    dates.push[date];
  }
})();

const fs = require("fs");
const path = require("path");

(async () => {
  try {
    const filePath = path.join(__dirname, "file.txt");
    const readStream = fs.createReadStream(filePath, { encoding: "utf8" });
    for await (const chunk of readStream) {
      console.log(chunk);
    }
    console.log("End of file");
  } catch (error) {
    console.log(error);
  }
})();
