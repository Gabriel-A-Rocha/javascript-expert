const { Product } = require("../../src/entities/product");

class ProductDataBuilder {
  // correct data by default (success)
  constructor() {
    this.productData = {
      id: "000001",
      name: "computer",
      price: 1000,
      category: "electronic",
    };
  }

  static aProduct() {
    return new ProductDataBuilder();
  }

  withInvalidId() {
    this.productData.id = "1";
    return this;
  }

  build() {
    const product = new Product(this.productData);
    return product;
  }
}

module.exports = { ProductDataBuilder };
