/*
ProductId: should be between 2 and 20 characters
Name: should be only words
Price: should be from 0 to 1000
Category: should be electronic or organic
*/

function productValidator(product) {
  const errors = [];

  const { id } = product;
  if (!(id.length >= 2 && id.length <= 20))
    errors.push(`Invalid id length: [${id}] should be between 2 and 20 characters long.`);

  return {
    result: errors.length === 0,
    errors,
  };
}

module.exports = { productValidator };
