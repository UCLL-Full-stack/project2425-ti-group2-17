"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_db_1 = __importDefault(require("../repository/customer.db"));
const getCustomers = () => customer_db_1.default.getCustomers();
exports.default = {
    getCustomers,
};
