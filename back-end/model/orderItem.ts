import { Order } from './order';
import { Product } from './product';

type OrderItemDetails = {
    order: Order;
    product: Product;
    quantity: number;
};

export class OrderItem {
    private order: Order;
    private product: Product;
    private quantity: number;

    constructor(orderItem: OrderItemDetails) {
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
