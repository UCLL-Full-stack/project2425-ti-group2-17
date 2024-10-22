"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = require("../../model/cart");
const cartItem_1 = require("../../model/cartItem");
const customer_1 = require("../../model/customer");
const product_1 = require("../../model/product");
test('given: valid values for cart, when: cart is created, then: cart is created with those values.', () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'john.doe@gmail.com';
    const password = 'password';
    const customer = new customer_1.Customer({ firstName, lastName, email, password, recentOrders: [] });
    const cart = new cart_1.Cart({ customer, products: [] });
    const product = new product_1.Product({
        name: 'T-Shirt',
        price: 30.0,
        stock: 100,
        category: ['Clothing', 'Men', 'Tops'],
        description: 'A comfortable cotton t-shirt',
        images: ['image1.jpg', 'image2.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Green'],
    });
    const quantity = 2;
    const cartItem = new cartItem_1.CartItem({ cart, product, quantity });
    expect(cartItem.getCart()).toEqual(cart);
    expect(cartItem.getProduct()).toEqual(product);
    expect(cartItem.getQuantity()).toEqual(quantity);
});
