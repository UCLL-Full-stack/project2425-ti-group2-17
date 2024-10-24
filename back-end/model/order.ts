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
        this.id = order.id;
        this.customer = order.customer;
        this.items = order.items;
        this.date = order.date;
        this.payment = order.payment;
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

    addItem(product: Product, quantity: number) {
        const orderItem = new OrderItem({ order: this, product, quantity });
        this.items.push(orderItem);
    }
}
