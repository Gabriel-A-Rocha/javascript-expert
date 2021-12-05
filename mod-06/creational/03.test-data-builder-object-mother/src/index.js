/*
ProductId: should be between 2 and 20 characters
Name: should be only words
Price: should be from 0 to 1000
Category: should be electronic or organic
*/

function productValidator(product) {
  const errors = [];

  const { id, name, price, category } = product;

  if (!(id.length >= 2 && id.length <= 20)) {
    errors.push(`Invalid id length: [${id}] should be between 2 and 20 characters long.`);
  }

  if (/(\d|\W)/.test(name)) {
    errors.push(`Invalid name: [${name}] contains digits.`);
  }

  if (!(price > 0 && price <= 1000)) {
    errors.push(`Invalid price: [${price}] should be between 0 and 1000`);
  }

  if (!(category === "electronic" || category === "organic")) {
    errors.push(`Invalid category: [${category}] must be either 'organic' or 'electronic'`);
  }

  return {
    result: errors.length === 0,
    errors,
  };
}

module.exports = { productValidator };
