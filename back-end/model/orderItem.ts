import { CartItem } from './cartItem';
import { Order } from './order';
import { Product } from './product';

export class OrderItem {
    private id?: number;
    private order: Order;
    private product: Product;
    private quantity: number;

    constructor(orderItem: { order: Order; product: Product; quantity: number; id?: number }) {
        this.validate(orderItem);
        this.id = orderItem.id;
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
    validate(orderItem: { order: Order; product: Product; quantity: number }) {
        if (!orderItem.order) {
            throw new Error('Order cannot be null or undefined.');
        }

        if (!orderItem.product) {
            throw new Error('Product cannot be null or undefined.');
        }

        if (orderItem.quantity <= 0) {
            throw new Error('Quantity must be greater than zero.');
        }
    }
}
