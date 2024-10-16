"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const orderItem_1 = require("./orderItem");
class Order {
    constructor(order) {
        this.id = order.id;
        this.customer = order.customer;
        this.items = order.items;
        this.date = order.date;
        this.payment = order.payment;
    }
    getId() {
        return this.id;
    }
    getCustomer() {
        return this.customer;
    }
    getItems() {
        return this.items;
    }
    getDate() {
        return this.date;
    }
    getPayment() {
        return this.payment;
    }
    addItem(product, quantity) {
        const orderItem = new orderItem_1.OrderItem({ order: this, product, quantity });
        this.items.push(orderItem);
    }
}
exports.Order = Order;
