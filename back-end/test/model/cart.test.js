"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = require("../../model/cart");
const customer_1 = require("../../model/customer");
const product_1 = require("../../model/product");
const customerTestData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    password: 'password',
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
beforeEach(() => {
    customer = new customer_1.Customer(Object.assign(Object.assign({}, customerTestData), { recentOrders: [] }));
    product = new product_1.Product(productTestData);
    cart = new cart_1.Cart({ customer, products: [] });
});
test('given: valid values for cart, when: cart is created, then: cart is created with those values.', () => {
    expect(cart.getCustomer()).toEqual(customer);
    expect(cart.getProducts()).toHaveLength(0);
});
test('given: valid cart, when: cart item is added to cart, then: cart item is added to products array.', () => {
    cart.addItem(product, 2);
    expect(cart.getProducts()).toHaveLength(1);
});
test('given: invalid quantity, when: cart item is added to cart, then: an error is thrown.', () => {
    expect(() => cart.addItem(product, -1)).toThrow('Quantity must be greater than zero.');
});
test('given: product not in cart, when: product is added, then: product is added as a new CartItem.', () => {
    cart.addItem(product, 2);
    expect(cart.getProducts()).toHaveLength(1);
    expect(cart.getProducts()[0].getProduct()).toEqual(product);
    expect(cart.getProducts()[0].getQuantity()).toBe(2);
});
test('given: product already in cart, when: same product is added again, then: quantity is updated.', () => {
    cart.addItem(product, 2);
    cart.addItem(product, 3);
    expect(cart.getProducts()).toHaveLength(1);
    expect(cart.getProducts()[0].getQuantity()).toBe(5);
});
test('given: multiple products, when: each is added to the cart, then: all are present in the cart.', () => {
    const product2 = new product_1.Product(Object.assign(Object.assign({}, productTestData), { name: 'Jeans', price: 50.0, id: 2 }));
    cart.addItem(product, 2);
    cart.addItem(product2, 1);
    expect(cart.getProducts()).toHaveLength(2);
    expect(cart.getProducts()[0].getProduct()).toEqual(product);
    expect(cart.getProducts()[1].getProduct()).toEqual(product2);
});
