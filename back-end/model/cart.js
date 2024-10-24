"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const cartItem_1 = require("./cartItem");
class Cart {
    constructor(cart) {
        this.validate(cart);
        this.id = cart.id;
        this.customer = cart.customer;
        this.products = cart.products;
    }
    getId() {
        return this.id;
    }
    getCustomer() {
        return this.customer;
    }
    getProducts() {
        return this.products;
    }
    validate(cart) {
        if (!cart.customer)
            throw new Error('Customer cannot be null or undefined.');
        if (!Array.isArray(cart.products) || cart.products.length === 0)
            throw new Error('Cart must have at least one product.');
    }
    addItem(product, quantity) {
        if (quantity <= 0)
            throw new Error('Quantity must be greater than zero.');
        const existingProductIndex = this.products.findIndex((item) => item.getProduct().getId() === product.getId());
        if (existingProductIndex !== -1) {
            this.products[existingProductIndex].updateQuantity(quantity);
        }
        else {
            const cartItem = new cartItem_1.CartItem({ cart: this, product, quantity });
            this.products.push(cartItem);
        }
    }
}
exports.Cart = Cart;
