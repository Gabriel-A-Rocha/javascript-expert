"use strict";

import Payment from "./events/payment.js";
import PaymentSubject from "./subjects/paymentSubject.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";

const subject = new PaymentSubject();

const marketing = new Marketing();
subject.subscribe(marketing);

const shipment = new Shipment();
subject.subscribe(shipment);

const payment = new Payment(subject);

const paymentData1 = {
  id: Date.now(),
  userName: "Rick Astley",
};

const paymentData2 = {
  id: Date.now(),
  userName: "Harry Potter",
};

payment.creditCard(paymentData1);
payment.creditCard(paymentData2);

const paymentData3 = {
  id: Date.now(),
  userName: "Neil deGrasse Tyson",
};

subject.unsubscribe(marketing);

payment.creditCard(paymentData3);
