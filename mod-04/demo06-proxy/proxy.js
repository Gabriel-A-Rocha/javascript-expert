"use strict";

const Event = require("events");

const event = new Event();

const eventName = "counter";

event.on(eventName, (msg) => console.log("Counter updated", msg));

event.emit(eventName, "Hi!");
event.emit(eventName, "Bye!");

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
    console.log("\nAccessing...", { [prop]: value });
    return value;
  },
});

setInterval(function () {
  proxy.counter += 1;
  if (proxy.counter === 5) clearInterval(this);
}, 500);
