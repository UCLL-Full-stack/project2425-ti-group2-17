"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = require("../../model/cart");
const cartItem_1 = require("../../model/cartItem");
const customer_1 = require("../../model/customer");
const product_1 = require("../../model/product");
const customerTestData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    password: 'password',
    recentOrders: [],
};
const productTestData = {
    name: 'T-Shirt',
    price: 30.0,
    stock: 100,
    category: ['Clothing', 'Men', 'Tops'],
    description: 'A comfortable cotton t-shirt',
    images: ['image1.jpg', 'image2.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Green'],
};
let customer;
let product;
let cart;
let cartItem;
beforeEach(() => {
    customer = new customer_1.Customer(customerTestData);
    product = new product_1.Product(productTestData);
    cart = new cart_1.Cart({ customer, products: [] });
    cartItem = new cartItem_1.CartItem({ cart, product, quantity: 2 });
});
test('given: valid values for cartItem, when: cartItem is created, then: cartItem is created with those values.', () => {
    expect(cartItem.getCart()).toEqual(cart);
    expect(cartItem.getProduct()).toEqual(product);
    expect(cartItem.getQuantity()).toEqual(2);
});
test('given: invalid cart, when: cartItem is created, then: error is thrown.', () => {
    expect(() => new cartItem_1.CartItem({ cart: null, product, quantity: 2 })).toThrow('Cart cannot be null or undefined.');
});
test('given: invalid product, when: cartItem is created, then: error is thrown.', () => {
    expect(() => new cartItem_1.CartItem({ cart, product: null, quantity: 2 })).toThrow('Product cannot be null or undefined.');
});
test('given: invalid quantity, when: cartItem is created, then: error is thrown.', () => {
    expect(() => new cartItem_1.CartItem({ cart, product, quantity: 0 })).toThrow('Quantity must be greater than zero.');
});
test('given: valid cartItem, when: updateQuantity is called with valid new quantity, then: quantity is updated and stock adjusted.', () => {
    const previousQuantity = cartItem.getQuantity();
    const newQuantity = 5;
    const quantityDifference = newQuantity - previousQuantity;
    const previousProductStock = product.getStock();
    cartItem.updateQuantity(newQuantity);
    expect(cartItem.getQuantity()).toEqual(newQuantity);
    expect(product.getStock()).toEqual(previousProductStock - quantityDifference);
});
test('given: valid cartItem, when: updateQuantity is called with zero, then: error is thrown.', () => {
    expect(() => cartItem.updateQuantity(0)).toThrow('Quantity must be greater than zero.');
});
test('given: valid cartItem, when: updateQuantity is called with negative quantity, then: error is thrown.', () => {
    expect(() => cartItem.updateQuantity(-1)).toThrow('Quantity must be greater than zero.');
});
test('given: limited product stock, when: updateQuantity exceeds stock, then: error is thrown.', () => {
    product = new product_1.Product(Object.assign(Object.assign({}, productTestData), { stock: 2 }));
    cartItem = new cartItem_1.CartItem({ cart, product, quantity: 2 });
    expect(() => cartItem.updateQuantity(5)).toThrow('Not enough stock available to update the quantity.');
});
test('given: valid cartItem, when: updateQuantity decreases quantity, then: quantity updated and stock increased.', () => {
    const previousQuantity = cartItem.getQuantity();
    const newQuantity = 1;
    const quantityDifference = newQuantity - previousQuantity;
    const previousProductStock = product.getStock();
    cartItem.updateQuantity(newQuantity);
    expect(cartItem.getQuantity()).toEqual(newQuantity);
    expect(product.getStock()).toEqual(previousProductStock - quantityDifference);
});
