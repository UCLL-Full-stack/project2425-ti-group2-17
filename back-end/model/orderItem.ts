import { Order } from './order';
import { Product } from './product';

export class OrderItem {
    private order: Order;
    private product: Product;
    private quantity: number;

    constructor(orderItem: { order: Order; product: Product; quantity: number }) {
        this.order = orderItem.order;
        this.product = orderItem.product;
        this.quantity = orderItem.quantity;
    }

    getOrder(): Order {
        return this.order;
    }

    getProduct(): Product {
        return this.product;
    }

    getQuantity(): number {
        return this.quantity;
    }
}
