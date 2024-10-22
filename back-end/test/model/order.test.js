"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const customer_1 = require("../../model/customer");
const order_1 = require("../../model/order");
const product_1 = require("../../model/product");
const payment_1 = require("../../model/payment");
test('given: valid values for order, when: order is created, then: order is created with those values', () => {
    const customer = new customer_1.Customer({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'securepassword123',
        recentOrders: [],
    });
    const tShirt = new product_1.Product({
        name: 'T-Shirt',
        price: 30.0,
        stock: 100,
        category: ['Clothing', 'Men', 'Tops'],
        description: 'A comfortable cotton t-shirt',
        images: ['image1.jpg', 'image2.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Green'],
    });
    const date = (0, date_fns_1.set)(new Date(), { year: 2024, month: 2, date: 23 });
    const payment = new payment_1.Payment({ amount: 60, date, paymentStatus: 'paid' });
    const order = new order_1.Order({ customer, items: [], date, payment });
    order.addItem(tShirt, 2);
    expect(order.getCustomer()).toEqual(customer);
    expect(order
        .getItems()
        .some((orderItem) => orderItem.getProduct() === tShirt && orderItem.getQuantity() === 2)).toBe(true);
    expect(order.getDate()).toEqual(date);
    expect(order.getPayment()).toEqual(payment);
});
