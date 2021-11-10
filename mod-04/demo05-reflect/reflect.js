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

// creating object property --> using Object.defineProperty
Object.defineProperty(myDate, "prop1", { value: () => "Return 1!" });
console.log("myDate.prop1", myDate.prop1());

deepStrictEqual(myDate.prop1(), "Return 1!");

// creating object property --> using Reflect.defineProperty
Reflect.defineProperty(myDate, "prop2", { value: () => "Return 2!" });
console.log("myDate.prop2", myDate.prop2());

deepStrictEqual(myDate.prop2(), "Return 2!");

// deleting object property --> using delete operator (not recommended)
const user1 = { name: "Gabe" };
console.log("user1", user1);

delete user1.name;
console.log("user1", user1);

deepStrictEqual(user1.hasOwnProperty("user1"), false);

// deleting object property --> using Reflect
const user2 = { name: "Mary" };
Reflect.deleteProperty(user2, "name");
console.log("user2", user2);

deepStrictEqual(user2.hasOwnProperty("name"), false);

const hero1 = { superman: "Clark Kent" };
const hero2 = { batman: "Bruce Wayne" };

// verify key existance --> using "in"
ok("superman" in hero1);

// verify key existance --> using Reflect
ok(Reflect.has(hero2, "batman"));
