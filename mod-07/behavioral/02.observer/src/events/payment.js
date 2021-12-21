export default class Payment {
  constructor(paymentSubject) {
    this.paymentSubject = paymentSubject;
  }

  creditCard(paymentData) {
    console.log(`\nA payment was received from user ${paymentData.userName}`);
    this.paymentSubject.notify(paymentData);
  }
}
