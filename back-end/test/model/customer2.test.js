"use strict";
/*
    🚨 TESTS FOR CUSTOMER TO BE WRITTEN, BECAUSE THIS IS JUST FOR STUB CUSTOMER!
*/
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = require("../../model/customer");
test('given: valid values for customer, when: customer is created, then: customer is created with those values', () => {
    const customer = new customer_1.Customer({
        name: 'John Doe',
        email: 'john.doe@example.com',
    });
    expect(customer.getName()).toEqual('John Doe');
    expect(customer.getEmail()).toEqual('john.doe@example.com');
});
