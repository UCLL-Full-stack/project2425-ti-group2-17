"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const payment_1 = require("../../model/payment");
test('given: valid values for payment, when: payment is created, then: payment is created with those values', () => {
    const date = (0, date_fns_1.set)(new Date(), { year: 2024, month: 2, date: 23 });
    const payment = new payment_1.Payment({ amount: 60, date, paymentStatus: 'paid' });
    expect(payment.getAmount()).toEqual(60);
    expect(payment.getDate()).toEqual(date);
    expect(payment.getPaymentStatus()).toEqual('paid');
});
