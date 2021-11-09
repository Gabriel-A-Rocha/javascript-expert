const { deepStrictEqual } = require("assert");

const myMap = new Map();

myMap.set(1, "one");
myMap.set("id", 1);
myMap.set("name", "John Doe");
myMap.set(false, 3);
myMap.set(true, () => 4);
myMap.set("key", { text: "value" });
console.log(" 🔹 myMap", myMap);

// using constructor
const myMapWithConstructor = new Map([
  [1, "one"],
  ["id", 1],
  ["name", "John Doe"],
  [false, 3],
  [true, () => 4],
  ["key", { text: "value" }],
]);
console.log(" 🔹 myMapWithConstructor", myMapWithConstructor);

deepStrictEqual(myMap.get("name"), "John Doe");
deepStrictEqual(myMap.get(false), 3);
deepStrictEqual(myMap.get(true)(), 4);
deepStrictEqual(myMap.get("key"), { text: "value" });

const obj = { id: 1 };

myMap.set(obj, { name: "Gabriel Rocha" });
// only works using reference
deepStrictEqual(myMap.get({ id: 1 }), undefined);
deepStrictEqual(myMap.get(obj), { name: "Gabriel Rocha" });

// Object.keys(obj).length
deepStrictEqual(myMap.size, 7);

// obj.hasOwnProperty("id")
deepStrictEqual(myMap.has("id"), true);

// delete obj.id
deepStrictEqual(myMap.delete("id"), true);
deepStrictEqual(myMap.delete("invalid-key"), false);

// for...in or for...of Object.entries()
for (const key in obj) {
  const value = obj[key];
  console.log(key, value);
}

for (const [key, value] of Object.entries(obj)) {
  console.log(key, value);
}

for (const [key, value] of myMap) {
  console.log({ key, value });
}

console.log([...myMap]);

console.log(obj.toString());
obj["toString"] = () => "Hello!";
console.log(obj.toString());

// clear capability
myMap.clear();
deepStrictEqual(myMap.size, 0);

// Weak Map - garbage collected after losing references
// prevents memory leaks
const weakMap = new WeakMap();

let hero = { name: "Superman" };
weakMap.set(hero, { identity: "Clark Joseph Kent" });
console.log(weakMap.get(hero));

hero = null;
console.log(weakMap.get(hero));
