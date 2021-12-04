/*
ProductId: should be between 2 and 20 characters
Name: should be only words
Price: should be from 0 to 1000
Category: should be electronic or organic
*/

function productValidator(product) {
  const errors = [];

  return {
    result: errors.length === 0,
    errors,
  };
}

module.exports = { productValidator };
