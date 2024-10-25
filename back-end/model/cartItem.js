"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
class CartItem {
    constructor(cartItem) {
        this.validate(cartItem);
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
    validate(cartItem) {
        if (!cartItem.cart) {
            throw new Error('Cart cannot be null or undefined.');
        }
        if (!cartItem.product) {
            throw new Error('Product cannot be null or undefined.');
        }
        if (cartItem.quantity <= 0) {
            throw new Error('Quantity must be greater than zero.');
        }
    }
    updateQuantity(newQuantity) {
        if (newQuantity <= 0) {
            throw new Error('Quantity must be greater than zero.');
        }
        const quantityDifference = newQuantity - this.quantity;
        if (quantityDifference > 0 && this.product.getStock() < quantityDifference) {
            throw new Error('Not enough stock available to update the quantity.');
        }
        this.product.updateStock(-quantityDifference);
        this.quantity = newQuantity;
    }
}
exports.CartItem = CartItem;
