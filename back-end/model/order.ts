import { Customer } from './customer';
import { OrderItem } from './orderItem';
import { Payment } from './payment';
import { Product } from './product';

export class Order {
    private id?: number;
    private customer: Customer;
    private items: OrderItem[];
    private date: Date;
    private payment: Payment;

    constructor(order: {
        customer: Customer;
        items: OrderItem[];
        date: Date;
        payment: Payment;
        id?: number;
    }) {
        this.validate(order);
        this.id = order.id;
        this.customer = order.customer;
        this.items = order.items;
        this.date = order.date;
        this.payment = order.payment;

        const totalAmount = this.getTotalAmount();
        this.payment.setAmount(totalAmount);
    }

    getId(): number | undefined {
        return this.id;
    }

    getCustomer(): Customer {
        return this.customer;
    }

    getItems(): OrderItem[] {
        return this.items;
    }

    getDate(): Date {
        return this.date;
    }

    getPayment(): Payment {
        return this.payment;
    }

    getTotalAmount(): number {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    validate(order: { customer: Customer; items: OrderItem[]; date: Date; payment: Payment }) {
        if (!order.customer) {
            throw new Error('Customer cannot be null or undefined.');
        }

        if (!(order.date instanceof Date) || isNaN(order.date.getTime())) {
            throw new Error('Invalid date provided.');
        }

        const currentDate = new Date();

        if (order.date > currentDate) {
            throw new Error('Order date cannot be in the future.');
        }
        if (!order.payment) {
            throw new Error('Payment cannot be null or undefined.');
        }
    }

    addItem(product: Product, quantity: number) {
        const orderItem = new OrderItem({ product, quantity });

        this.items.push(orderItem);
    }

    static from({
        customer,
        items,
        date,
        payment,
        id,
    }: {
        customer: Customer;
        items: OrderItem[];
        date: Date;
        payment: Payment;
        id?: number;
    }): Order {
        return new Order({ customer, items, date, payment, id });
    }
}
