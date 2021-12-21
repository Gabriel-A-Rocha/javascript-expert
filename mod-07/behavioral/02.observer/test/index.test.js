import { expect, describe, test, jest } from "@jest/globals";
import Payment from "../src/events/payment.js";
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

  test("#PaymentSubject should not notify unsubscribed observers", () => {
    const subject = new PaymentSubject();
    const observer = {
      update: jest.fn(),
    };
    subject.subscribe(observer);
    subject.unsubscribe(observer);
    const data = "Hello World";
    subject.notify(data);

    expect(observer.update).not.toHaveBeenCalled();
  });

  test("#Payment should notify subject after a credit card transaction", () => {
    const subject = new PaymentSubject();
    const payment = new Payment(subject);
    const data = {
      userName: "Gabriel Rocha",
      id: Date.now(),
    };

    const paymentSubjectNotifierSpy = jest.spyOn(payment.paymentSubject, payment.paymentSubject.notify.name);
    payment.creditCard(data);

    expect(paymentSubjectNotifierSpy).toHaveBeenCalledWith(data);
  });

  test.todo("#All should notify subscribers after a credit card transaction");
});
