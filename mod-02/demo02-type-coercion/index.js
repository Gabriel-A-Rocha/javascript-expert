"use strict";

true + 2;
console.log("🎈 - true + 2", true + 2);

true - 2;
console.log("🎈 - true - 2", true - 2);

"21" + true;
console.log("🎈 - '21' + true", "21" + true);

"21" - true;
console.log("🎈 - '21' - true", "21" - true);

999999999999999;
console.log("🎈 - 999999999999999", 999999999999999);

console.log("🎈 - 9999999999999999", 9999999999999999);
9999999999999999;

0.1 + 0.2;
console.log("🎈 - 0.1 + 0.2", 0.1 + 0.2);

0.1 + 0.2 === 0.3;
console.log("🎈 - 0.1 + 0.2 === 0.3", 0.1 + 0.2 === 0.3);

3 > 2 > 1;
console.log("🎈 - 3 > 2 > 1", 3 > 2 > 1);

3 > 2 >= 1;
console.log("🎈 - 3 > 2 >= 1", 3 > 2 >= 1);

"21" - -1;
console.log("🎈 - '21' - -1", "21" - -1);

"1" == 1;
console.log("🎈 - '1' == 1", "1" == 1);

"1" === 1;
console.log("🎈 - '1' === 1", "1" === 1); // always use strict equality operator to avoid unexpected results

String(123);
console.log("🎈 - String(123)", String(123));

123 + "";
console.log("🎈 - 123 + ''", 123 + "");

console.assert(String(123) === "123", "explicit conversion to string");
console.assert(123 + "" === "123", "implicit conversion to string");

// returns the expression value, not boolean output
null || 1;
console.log("🎈 - null || 1", null || 1);

"hello" || 1;
console.log("🎈 - 'hello' || 1", "hello" || 1);

console.assert(("hello" || 123) === "hello", "|| returns the value of the first truthy element");
console.log("🎈 - hello' || 123", "hello" || 123);

console.assert(("hello" && 123) === 123, "&& returns the value of the second truthy element");
console.log("🎈 - 'hello' && 123", "hello" && 123);

console.assert(
  (null && 123) === null,
  "falsy value in the first operand short-circuits the expression"
);
console.log("🎈 - null && 123", null && 123);

console.assert(
  (false && 123) === false,
  "falsy value in the first operand short-circuits the expression"
);
console.log("🎈 - false && 123", false && 123);

const item = {
  name: "Dennis",
  age: 35,
};

item + 1;
console.log("🎈 - item + 1", item + 1);

const item2 = {
  name: "Dennis",
  age: 35,
  // overriding default toString method
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
};

item2 + 1;
console.log("🎈 - item2 + 1", item2 + 1);

const item3 = {
  name: "Dennis",
  age: 35,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  // overriding default valueOf method
  valueOf() {
    return 17;
  },
};

item3 + 1;
console.log("🎈 - item3 + 1", item3 + 1);

"".concat(item3);
console.log("🎈 - ''.concat(item3)", "".concat(item3));

String(item3);
console.log("🎈 - String(item3)", String(item3));

Number(item3);
console.log("🎈 - Number(item3)", Number(item3));

const item4 = {
  name: "Dennis",
  age: 35,

  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },

  valueOf() {
    return 17;
  },

  [Symbol.toPrimitive](coercionType) {
    console.log("Trying to convert to", coercionType);
    const types = {
      string: JSON.stringify(this),
      number: 123,
    };
    return types[coercionType] || types.string;
  },
};

Number(item4);
console.log("🎈 - Number(item4)", Number(item4));

String(item4);
console.log("🎈 - String(item4)", String(item4));

new Date(item4);
console.log("🎈 - new Date(item4)", new Date(item4));

!!item4;
console.log("🎈 - !!item4", !!item4);

"".concat(item4);
console.log("🎈 - ''.concat(item4)", "".concat(item4));
