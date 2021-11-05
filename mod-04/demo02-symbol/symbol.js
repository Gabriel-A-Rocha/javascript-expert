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

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== "string") throw new TypeError();

    const dataTimeOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    const items = this[kItems].map((item) =>
      new Intl.DateTimeFormat("pt-BR", dataTimeOptions).format(item)
    );

    const listOptions = {
      style: "long",
      type: "conjunction",
    };

    return new Intl.ListFormat("pt-BR", listOptions).format(items);
  }
}

const myDate = new MyDate([2020, 0, 3], [2020, 1, 8]);

console.log("myDate", myDate);
assert.throws(() => Number(myDate), TypeError);

console.log("String(myDate)", String(myDate));
assert.deepStrictEqual(String(myDate), "03 de janeiro de 2020 e 08 de fevereiro de 2020");
