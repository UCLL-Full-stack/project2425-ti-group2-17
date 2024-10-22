"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const cartItem_1 = require("./cartItem");
class Cart {
    constructor(cart) {
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
    addItem(product, quantity) {
        const cartItem = new cartItem_1.CartItem({ cart: this, product, quantity });
        this.products.push(cartItem);
    }
}
exports.Cart = Cart;
