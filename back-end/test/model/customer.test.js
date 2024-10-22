"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = require("../../model/customer");
test('given: valid values for customer, when: customer is created, then: customer is created with those values.', () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'john.doe@gmail.com';
    const password = 'password';
    const customer = new customer_1.Customer({ firstName, lastName, email, password, recentOrders: [] });
    expect(customer.getFirstName()).toEqual(firstName);
    expect(customer.getLastName()).toEqual(lastName);
    expect(customer.getEmail()).toEqual(email);
    expect(customer.getPassword()).toEqual(password);
    expect(customer.getRecentOrders()).toHaveLength(0);
});