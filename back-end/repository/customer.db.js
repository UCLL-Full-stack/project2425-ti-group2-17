"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = require("../model/customer");
const customers = [
    new customer_1.Customer({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        recentOrders: [],
        id: 1,
    }),
    new customer_1.Customer({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'password456',
        recentOrders: [],
        id: 2,
    }),
    new customer_1.Customer({
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        password: 'password789',
        recentOrders: [],
        id: 3,
    }),
];
const getCustomers = () => customers;
exports.default = {
    getCustomers,
};
