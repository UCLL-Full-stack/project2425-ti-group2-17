"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRouter = void 0;
const express_1 = require("express");
const customer_service_1 = __importDefault(require("../service/customer.service"));
const customerRouter = (0, express_1.Router)();
exports.customerRouter = customerRouter;
customerRouter.get('/customers', (req, res, next) => {
    try {
        const customers = customer_service_1.default.getCustomers();
        res.status(200).json(customers);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
        else {
            res.status(400).json({ status: 'error', errorMessage: error });
        }
    }
});
