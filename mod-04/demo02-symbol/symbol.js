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

console.log([...obj]);

assert.deepStrictEqual([...obj], ["a", "b", "c"]);

const kItems = Symbol("kItems");

class MyDate {
  constructor(...args) {
    this[kItems] = args.map((arg) => new Date(...arg));
  }
}

const myDate = new MyDate([2020, 0, 3], [2020, 1, 8], [2020, 2, 12]);

console.log("myDate", myDate);
