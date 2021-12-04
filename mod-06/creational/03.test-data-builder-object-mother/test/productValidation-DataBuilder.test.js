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

  describe("Product validation rules", () => {
    it("should return an object error when creating product with invalid id", () => {
      const product = ProductDataBuilder.aProduct().withInvalidId().build();
      const result = productValidator(product);

      const expected = {
        result: false,
        errors: [`Invalid id length: [${product.id}] should be between 2 and 20 characters long.`],
      };

      expect(result).to.be.deep.equal(expected);
    });

    it("should return an object error when creating product with invalid name");
    it("should return an object error when creating product with invalid price");
    it("should return an object error when creating product with invalid category");
  });
});
