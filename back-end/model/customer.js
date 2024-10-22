"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const user_1 = require("./user");
class Customer extends user_1.User {
    constructor(customer) {
        // this.id = customer.id;
        // this.firstName = customer.firstName;
        // this.lastName = customer.lastName;
        // this.email = customer.email;
        // this.password = customer.password;
        // // this.isAdmin = user.isAdmin;
        super(customer);
        this.recentOrders = customer.recentOrders;
    }
    getRecentOrders() {
        return this.recentOrders;
    }
    addItem(order) {
        this.recentOrders.push(order);
    }
}
exports.Customer = Customer;