"use strict";
/*
    🚨 THIS IS JUST A STUB FOR TESTING PURPOSES, YOU SHOULD FOLLOW OUR DOMAIN MODEL!
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
class Customer {
    constructor(customer) {
        this.id = customer.id;
        this.name = customer.name;
        this.email = customer.email;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
}
exports.Customer = Customer;
