import { CartItem } from './cartItem';
import { Order } from './order';
import { Product } from './product';

export class OrderItem {
    private id?: number;
    private orderId: number;
    private product: Product;
    private quantity: number;

    constructor(orderItem: { orderId: number; product: Product; quantity: number; id?: number }) {
        this.validate(orderItem);
        this.id = orderItem.id;
        this.orderId = orderItem.orderId;
        this.product = orderItem.product;
        this.quantity = orderItem.quantity;
        this.product.updateStock(-this.quantity);
    }

    getOrderId(): number {
        return this.orderId;
    }

    getProduct(): Product {
        return this.product;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getTotalPrice(): number {
        return this.product.getPrice() * this.quantity;
    }

    validate(orderItem: { orderId: number; product: Product; quantity: number }) {
        if (!orderItem.orderId) {
            throw new Error('Order ID cannot be null or undefined.');
        }

        if (!orderItem.product) {
            throw new Error('Product cannot be null or undefined.');
        }

        if (orderItem.quantity <= 0) {
            throw new Error('Quantity must be greater than zero.');
        }
    }
}
