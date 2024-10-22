"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
class CartItem {
    constructor(cartItem) {
        this.id = cartItem.id;
        this.cart = cartItem.cart;
        this.product = cartItem.product;
        this.quantity = cartItem.quantity;
    }
    getId() {
        return this.id;
    }
    getCart() {
        return this.cart;
    }
    getProduct() {
        return this.product;
    }
    getQuantity() {
        return this.quantity;
    }
}
exports.CartItem = CartItem;
