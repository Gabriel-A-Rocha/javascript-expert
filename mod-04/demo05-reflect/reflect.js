"use strict";

const { deepStrictEqual, throws, ok } = require("assert");

const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  },
};

deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

// external malicious hack
myObj.add.apply = function () {
  throw new TypeError("Malicious code");
};

throws(() => myObj.add.apply({}, [10]), {
  name: "TypeError",
  message: "Malicious code",
});

const result = Reflect.apply(myObj.add, { arg1: 4, arg2: 6 }, [10]);
deepStrictEqual(result, 20);

function myDate() {}

// creating object property

// Object.defineProperty
Object.defineProperty(myDate, "prop1", { value: () => "Return 1!" });
deepStrictEqual(myDate.prop1(), "Return 1!");

// Reflect.defineProperty
Reflect.defineProperty(myDate, "prop2", { value: () => "Return 2!" });
deepStrictEqual(myDate.prop2(), "Return 2!");

// deleting object property

// delete operator (not recommended)
const user1 = { name: "Gabe" };
delete user1.name;
deepStrictEqual(user1.hasOwnProperty("user1"), false);

// Reflect.deleteProperty
const user2 = { name: "Mary" };
Reflect.deleteProperty(user2, "name");
deepStrictEqual(user2.hasOwnProperty("name"), false);

const hero1 = { superman: "Clark Kent" };
const hero2 = { batman: "Bruce Wayne" };

// verify key existance

// in operator
ok("superman" in hero1);

// Reflect.has
ok(Reflect.has(hero2, "batman"));

// list object keys

// Object.getOwnPropertyNames, Object.getOwnPropertySymbols
const user = Symbol("user");
const userObject = {
  id: 1,
  [Symbol.for("password")]: 123,
  [user]: "Gabriel",
};

const objKeys = [
  ...Object.getOwnPropertyNames(userObject),
  ...Object.getOwnPropertySymbols(userObject),
];
deepStrictEqual(objKeys, ["id", Symbol.for("password"), user]);

// Reflect.ownKeys
deepStrictEqual(
  JSON.stringify(Reflect.ownKeys(userObject)),
  JSON.stringify(["id", Symbol("password"), Symbol("user")])
);
