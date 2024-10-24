import { Order } from './order';
import { User } from './user';

export class Customer extends User {
    private recentOrders: Order[];
    constructor(customer: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        recentOrders: Order[];
        id?: number;
    }) {
        super(customer);
        this.recentOrders = customer.recentOrders;
    }

    getRecentOrders(): Order[] {
        return this.recentOrders;
    }

    addItem(order: Order) {
        this.recentOrders.push(order);
    }
}
