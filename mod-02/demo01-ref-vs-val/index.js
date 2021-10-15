"use strict";

const { deepStrictEqual } = require("assert");

let counter = 0;
let counter2 = counter;
counter2++;

// Primitive types always allocate new space in memory (copy).
// Value changes do not affect other variables.
deepStrictEqual(counter, 0);
deepStrictEqual(counter2, 1);

const item = { counter: 0 };
const item2 = item;
item2.counter++;

// Non primitive types shares the same memory address (reference).
// Value changes affect all variables pointing to the same address.
deepStrictEqual(item, { counter: 1 });
deepStrictEqual(item2, { counter: 1 });

item.counter++;

deepStrictEqual(item, { counter: 2 });
deepStrictEqual(item2, { counter: 2 });
