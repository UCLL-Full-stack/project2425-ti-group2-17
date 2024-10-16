"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
class OrderItem {
    constructor(orderItem) {
        this.order = orderItem.order;
        this.product = orderItem.product;
        this.quantity = orderItem.quantity;
    }
    getOrder() {
        return this.order;
    }
    getProduct() {
        return this.product;
    }
    getQuantity() {
        return this.quantity;
    }
}
exports.OrderItem = OrderItem;
