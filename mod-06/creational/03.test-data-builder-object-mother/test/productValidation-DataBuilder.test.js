const { expect } = require("chai");
const { describe, it } = require("mocha");

const { productValidator } = require("../src/index");
const { ProductDataBuilder } = require("./model/productDataBuilder");

describe("Test Data Builder", () => {
  it("should not return error for a valid product", () => {
    const product = ProductDataBuilder.aProduct().build();
    const result = productValidator(product);

    const expected = {
      result: true,
      errors: [],
    };

    expect(result).to.be.deep.equal(expected);
  });
});
