type PaymentDetails = {
    id?: number;
    amount: number;
    date: Date;
    paymentStatus: PaymentStatus;
};

type PaymentStatus = 'paid' | 'unpaid';

export class Payment {
    private id?: number;
    private amount: number;
    private date: Date;
    private paymentStatus: PaymentStatus;

    constructor(payment: PaymentDetails) {
        this.id = payment.id;
        this.amount = payment.amount;
        this.date = payment.date;
        this.paymentStatus = payment.paymentStatus;
    }

    getId(): number | undefined {
        return this.id;
    }

    getAmount(): number {
        return this.amount;
    }

    getDate(): Date {
        return this.date;
    }

    getPaymentStatus(): PaymentStatus {
        return this.paymentStatus;
    }
}
