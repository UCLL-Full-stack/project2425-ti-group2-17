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
    updateQuantity(newQuantity) {
        if (newQuantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        const quantityDifference = newQuantity - this.quantity;
        if (quantityDifference > 0) {
            this.product.updateStock(quantityDifference);
        }
        this.quantity = newQuantity;
    }
}
exports.CartItem = CartItem;
