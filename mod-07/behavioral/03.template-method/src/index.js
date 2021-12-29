import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
  customerId: "123",
  amount: 12.2,
  products: [{ description: "socks" }],
});

const orderBusiness = new OrderBusiness(order);

console.info("Order created", orderBusiness.create(order));
