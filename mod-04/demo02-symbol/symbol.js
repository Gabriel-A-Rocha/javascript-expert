const assert = require("assert");

// Keys

const uniqueKey = Symbol("userName");

const user = {};

user["userName"] = "value for ordinary objects";
user[uniqueKey] = "value for symbol";

assert.deepStrictEqual(user["userName"], "value for ordinary objects");
assert.deepStrictEqual(user[uniqueKey], "value for symbol");
assert.deepStrictEqual(user[Symbol("userName")], undefined);
