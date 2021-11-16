const { describe, it } = require("mocha");
const { expect } = require("chai");

const { InvalidRegexError, evaluateRegex } = require("../src/util");

describe("util", () => {
  it("evaluateRegex should throw an error if regex is unsafe", () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/gim;
    expect(() => evaluateRegex(unsafeRegex)).to.throw(
      InvalidRegexError,
      `This ${unsafeRegex} is unsafe.`
    );
  });

  it("evaluateRegex should not throw an error if regex is valid", () => {
    const safeRegex = /^([a-z])$/gim;
    expect(() => evaluateRegex(safeRegex)).to.not.throw;
    expect(evaluateRegex(safeRegex)).to.be.ok;
    expect(evaluateRegex(safeRegex)).to.be.deep.equal(/^([a-z])$/gim);
  });
});
