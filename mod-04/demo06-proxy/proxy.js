"use strict";

const Event = require("events");

const event = new Event();

const eventName = "counter";

event.on(eventName, (msg) => console.log("\nCounter updated", msg));

// event.emit(eventName, "Hi!");
// event.emit(eventName, "Bye!");

// object to be observed
const myCounter = {
  counter: 0,
};

// proxy --> custom functionality for object manipulation
const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue });
    target[propertyKey] = newValue;
    return true;
  },

  get: (object, prop) => {
    const value = object[prop];
    console.log("\nGetting counter...", { [prop]: value });
    return value;
  },
});

setInterval(function () {
  console.log("\n 🔹 Interval!");
  proxy.counter += 1;
  if (proxy.counter === 10) clearInterval(this);
}, 500);

setTimeout(() => {
  console.log("\n 🔹 Timeout!");
  proxy.counter = 7;
}, 700);

setImmediate(() => {
  console.log("\n 🔹 Immediate!");
  proxy.counter = 4;
});

// interruption --> instant execution
process.nextTick(() => {
  console.log("\n 🔹 Next Tick!");
  proxy.counter = 8;
});
