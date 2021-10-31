const { deepStrictEqual } = require("assert");

function* calculation(arg1, arg2) {
  yield arg1 * arg2;
}

function* main() {
  yield "Hello";
  yield "-";
  yield "World";
  yield* calculation(20, 10);
}

const generator = main();

deepStrictEqual(generator.next(), { value: "Hello", done: false });
deepStrictEqual(generator.next(), { value: "-", done: false });
deepStrictEqual(generator.next(), { value: "World", done: false });
deepStrictEqual(generator.next(), { value: 200, done: false });
deepStrictEqual(generator.next(), { value: undefined, done: true });

deepStrictEqual(Array.from(main()), ["Hello", "-", "World", 200]);
deepStrictEqual([...main()], ["Hello", "-", "World", 200]);

// Async Iterators

const { readFile, stat, readdir } = require("fs/promises");

function* promisified() {
  yield readFile(__filename);
  yield Promise.resolve("Hey Dude");
}

/* Promise.all([...promisified()]).then((results) => {
  console.log(" 🔹 results", results.toString());
}); */

/* (async () => {
  for await (const item of promisified()) {
    console.log(" 🔹 item", item.toString());
  }
})(); */

async function* systemInfo() {
  const file = await readFile(__filename);
  yield { file: file.toString() };

  const { size } = await stat(__filename);
  yield { size };

  const dir = await readdir(__dirname);
  yield { dir };
}

(async () => {
  for await (const item of systemInfo()) {
    console.log(" 🔹 item", item);
  }
})();
