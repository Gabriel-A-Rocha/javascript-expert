const { Fibonacci } = require("./fibonacci");
const sinon = require("sinon");
const { deepStrictEqual } = require("assert");

(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, "execute");
    for await (const i of fibonacci.execute(3)) {
    }

    const expectedCallCount = 4;
    deepStrictEqual(spy.callCount, expectedCallCount);
  }
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, "execute");

    const [...results] = fibonacci.execute(5);
    const expectedResult = [0, 1, 1, 2, 3];

    const { args } = spy.getCall(2);
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2,
    });

    deepStrictEqual(args, expectedParams);
    deepStrictEqual(results, expectedResult);
  }
})();
