export class Payment {
    private id?: number;
    private amount: number;
    private date: Date;
    private paymentStatus: string;

    constructor(payment: {
        amount: number;
        date: Date;
        paymentStatus: 'paid' | 'unpaid';
        id?: number;
    }) {
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

    getPaymentStatus(): string {
        return this.paymentStatus;
    }
}
