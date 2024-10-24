"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(user) {
        this.validate(user);
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
    }
    getId() {
        return this.id;
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    validate(user) {
        if (!user.firstName)
            throw new Error("The user's first name is required.");
        if (!user.lastName)
            throw new Error("The user's last name is required.");
        if (!user.email)
            throw new Error("The user's email is required.");
        if (!user.password)
            throw new Error("The user's password is required.");
    }
}
exports.User = User;
