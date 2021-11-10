const { deepStrictEqual, ok, throws } = require("assert");

const arr1 = ["0", "1", "2"];
const arr2 = ["0", "1", "3"];

const arr3 = arr1.concat(arr2).sort();
deepStrictEqual(arr3, ["0", "0", "1", "1", "2", "3"]);

const set = new Set([...arr1, ...arr2]);
deepStrictEqual([...set], ["0", "1", "2", "3"]);

// keys and values are the same for Set (compatibility with Map)
console.log("set.keys()", set.keys());
console.log("set.values()", set.values());
deepStrictEqual(set.keys(), set.values());

// search for an item in array
deepStrictEqual(arr3.includes("2"), true);
deepStrictEqual(arr3.includes("5"), false);
deepStrictEqual(arr3.indexOf("2"), 4);
deepStrictEqual(arr3.indexOf("5"), -1);

ok(set.has("2"));

const users01 = new Set(["Gabe", "Mary", "John"]);
const users02 = new Set(["Chris", "Mary", "Bart"]);

const intersection = [...users01].filter((user) => users02.has(user));
deepStrictEqual(intersection, ["Mary"]);

const difference = [...users01].filter((user) => !users02.has(user));
deepStrictEqual(difference, ["Gabe", "John"]);

// Weak Set --> garbage collected Set, not iterable
const user1 = { id: 123 };
const user2 = { id: 456 };
const weakSet = new WeakSet([user1, user2]);
throws(() => [...weakSet]);
