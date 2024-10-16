"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
class Payment {
    constructor(payment) {
        this.id = payment.id;
        this.amount = payment.amount;
        this.date = payment.date;
        this.paymentStatus = payment.paymentStatus;
    }
    getId() {
        return this.id;
    }
    getAmount() {
        return this.amount;
    }
    getDate() {
        return this.date;
    }
    getPaymentStatus() {
        return this.paymentStatus;
    }
}
exports.Payment = Payment;
