import { expect, describe, it, test, jest, beforeEach } from "@jest/globals";
import OrderBusiness from "../src/business/orderBusiness.js";
import Order from "../src/entities/order.js";

describe("Test suite for Template Method design pattern", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("OrderBusiness class", () => {
    test("executing OrderBusiness without Template Method", () => {
      const orderData = {
        customerId: 1,
        amount: 10.0,
        products: [{ description: "car" }],
      };

      const order = new Order(orderData);

      const orderBusiness = new OrderBusiness();

      const isValid = orderBusiness._validateRequiredFields(order);
      expect(isValid).toBeTruthy();

      const result = orderBusiness._create(order);
      expect(result).toBeTruthy();
    });

    test("executing OrderBusiness with Template Method", () => {
      const orderData = {
        customerId: 1,
        amount: 10.0,
        products: [{ description: "car" }],
      };

      const order = new Order(orderData);

      const orderBusiness = new OrderBusiness();

      const validationFn = jest.spyOn(orderBusiness, orderBusiness._validateRequiredFields.name);
      const createFn = jest.spyOn(orderBusiness, orderBusiness._create.name);

      const result = orderBusiness.create(order);

      expect(result).toBeTruthy();
      expect(validationFn).toHaveBeenCalled();
      expect(createFn).toHaveBeenCalled();
    });
  });
});
