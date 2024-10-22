"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const user_1 = require("./user");
class Admin extends user_1.User {
    constructor(admin) {
        super(admin);
    }
}
exports.Admin = Admin;
