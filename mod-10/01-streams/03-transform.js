"use strict";

import { Readable, Writable, Transform } from "stream";
import { createWriteStream } from "fs";

// data source
const readable = new Readable({
  read() {
    for (let i = 0; i < 1e3; i++) {
      const person = { id: Date.now() + i, name: `Gabriel-${i}` };
      const data = JSON.stringify(person);
      this.push(data);
    }

    // signals end of data
    this.push(null);
  },
});

// data processing
const mapFields = new Transform({
  transform(chunk, encoding, cb) {
    const data = JSON.parse(chunk);
    const result = `${data.id},${data.name.toUpperCase()}\n`;
    cb(null, result);
  },
});

const mapHeaders = new Transform({
  transform(chunk, encoding, cb) {
    this.counter = this.counter ?? 0;
    if (this.counter) {
      return cb(null, chunk);
    }
    this.counter += 1;
    cb(null, "id,name\n".concat(chunk));
  },
});

// data output
const writeable = new Writable({
  write(chunk, encoding, cb) {
    console.log(chunk.toString());
    cb();
  },
});

readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  //.pipe(writeable);
  .pipe(createWriteStream("id-name.csv"));
