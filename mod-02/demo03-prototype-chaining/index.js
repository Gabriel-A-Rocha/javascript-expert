"use strict";

const assert = require("assert");

const obj = {};
const arr = [];
const fn = () => {};

console.log(
  "🎈 - new Object().__proto__ === {}.__proto__",
  new Object().__proto__ === {}.__proto__
);
assert.deepStrictEqual(new Object().__proto__, {}.__proto__);

console.log("🎈 - obj.__proto__ === Object.prototype", obj.__proto__ === Object.prototype);
assert.deepStrictEqual(obj.__proto__, Object.prototype);

console.log("🎈 - arr.__proto__ === Array.prototype", arr.__proto__ === Array.prototype);
assert.deepStrictEqual(arr.__proto__, Array.prototype);

console.log("🎈 - fn.__proto__ === Function.prototype", fn.__proto__ === Function.prototype);
assert.deepStrictEqual(fn.__proto__, Function.prototype);

// all JavaScript  objects extends the Object.prototype, which is null
console.log("🎈 - obj.__proto__.__proto__", obj.__proto__.__proto__);
assert.deepStrictEqual(obj.__proto__.__proto__, null);

/* Previous approach to create classes - ES5 */

function Employee() {}
Employee.prototype.salary = () => "salary **";

console.log("🎈 - Employee.prototype.salary()", Employee.prototype.salary());

function Supervisor() {}
Supervisor.prototype = Object.create(Employee.prototype);

Supervisor.prototype.profitShare = () => "profit share **";

console.log("🎈 - Supervisor.prototype.salary()", Supervisor.prototype.salary());
console.log("🎈 - Supervisor.prototype.profitShare()", Supervisor.prototype.profitShare());

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype);

Manager.prototype.monthlyBonus = () => "monthly bonus **";

console.log("🎈 - Manager.prototype.salary()", Manager.prototype.salary());
console.log("🎈 - Manager.prototype.profitShare()", Manager.prototype.profitShare());
console.log("🎈 - Manager.prototype.monthlyBonus()", Manager.prototype.monthlyBonus());

// without "new", the first prototype will always be an instance of Function (no available methods)
// console.log(Manager.salary()); --> TypeError: Manager.salary is not a function

// we can use prototype to access super classes
console.log(
  "🎈 - Manager.prototype.__proto__ === Supervisor.prototype",
  Manager.prototype.__proto__ === Supervisor.prototype
);
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);

// with "new", __proto__ receives the target object prototype
const manager = new Manager();

console.log("🎈 - manager.salary()", manager.salary()); // second level of heritage
console.log("🎈 - manager.profitShare()", manager.profitShare()); // first level of heritage
console.log("🎈 - manager.monthlyBonus()", manager.monthlyBonus());

Supervisor.prototype === new Manager().__proto__.__proto__;
console.log(
  "🎈 - Supervisor.prototype === new Manager().__proto__.__proto__",
  Supervisor.prototype === new Manager().__proto__.__proto__
);
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__);

console.log("🎈 - manager.__proto__", manager.__proto__);
assert.deepStrictEqual(manager.__proto__, Manager.prototype);

console.log("🎈 - manager.__proto__.__proto__", manager.__proto__.__proto__);
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);

console.log("🎈 - manager.__proto__.__proto__.__proto__", manager.__proto__.__proto__.__proto__);
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype);

console.log(
  "🎈 - manager.__proto__.__proto__.__proto__.__proto__",
  manager.__proto__.__proto__.__proto__.__proto__
);
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype);

console.log(
  "🎈 - manager.__proto__.__proto__.__proto__.__proto__.__proto__",
  manager.__proto__.__proto__.__proto__.__proto__.__proto__
);
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null);

/* Modern approach to create classes - ES6 */

class T1 {
  ping() {
    return "ping";
  }
}

class T2 extends T1 {
  pong() {
    return "pong";
  }
}

class T3 extends T2 {
  shoot() {
    return "shoot";
  }
}

const t3 = new T3();
// prototype chain: T3 --> T2 --> T1 --> Object --> null
assert.deepStrictEqual(t3.__proto__, T3.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null);

t3.shoot();
t3.pong();
t3.ping();

console.log("🎈 - t3.shoot()", t3.shoot());
console.log("🎈 - t3.pong()", t3.pong());
console.log("🎈 - t3.ping()", t3.ping());
