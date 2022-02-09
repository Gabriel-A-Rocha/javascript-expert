// @ts-check

"use strict";

import { Readable, Writable } from "stream";

// data source
const readable = new Readable({
  read() {
    this.push("Hello World 1");
    this.push("Hello World 2");
    this.push("Hello World 3");

    // signals end of data
    this.push(null);
  },
});

// data output
const writeable = new Writable({
  write(chunk, encoding, cb) {
    console.log("msg", chunk.toString());
    cb();
  },
});

readable.pipe(writeable);
