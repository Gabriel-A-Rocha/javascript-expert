"use strict";

const {
  watch,
  promises: { readFile },
} = require("fs");

class File {
  watch(event, filename) {
    console.log("📍   this", this);
    console.log("📍   arguments", Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }

  async showContent(filename) {
    (await readFile(filename)).toString();
  }
}

const file = new File();

// Problem: "this" from the File class points to the FSWatcher.watch (caller)
// watch(__filename, file.watch);

// Redirecting "this" to the called function

// 1st alternative: use arrow function call
// watch(__filename, (event, filename) => file.watch(event, filename));

// 2nd alternative: explicitly bind "this" to the intended context
// watch(__filename, file.watch.bind(file));

// call function with the different object/arguments - call and apply behaves the same way
file.watch.call(
  { showContent: () => console.log("Using different showContent implementation with call!") },
  null,
  __filename
);

file.watch.apply(
  {
    showContent: () => console.log("Using apply instead of call"),
  },
  [null, __filename]
);

// watch(__filename, file.watch.bind(file));
