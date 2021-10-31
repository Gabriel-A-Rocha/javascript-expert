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

console.log([...main()]);
