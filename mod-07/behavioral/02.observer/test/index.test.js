import { expect, describe, test, jest } from "@jest/globals";
import PaymentSubject from "../src/subjects/paymentSubject.js";

describe("Test Suite for Observer Pattern", () => {
  test("#PaymentSubject should notify observers", () => {
    const subject = new PaymentSubject();
    const observer = {
      update: jest.fn(),
    };
    subject.subscribe(observer);
    const data = "Hello World";
    subject.notify(data);

    expect(observer.update).toBeCalledWith(data);
  });

  test.todo("#PaymentSubject should not notify unsubscribed observers");
  test.todo("#Payment should notify subject after a credit card transaction");
  test.todo("#All should notify subscribers after a credit card transaction");
});
