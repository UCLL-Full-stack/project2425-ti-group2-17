"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("../../model/admin");
const adminTestData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    password: 'password123',
};
let admin;
beforeEach(() => {
    admin = new admin_1.Admin(adminTestData);
});
const { firstName, lastName, email, password } = adminTestData;
const createAdmin = (overrides = {}) => new admin_1.Admin(Object.assign(Object.assign({}, adminTestData), overrides));
test('given: valid values for admin, when: admin is created, then: admin is created with those values.', () => {
    expect(admin.getFirstName()).toEqual(firstName);
    expect(admin.getLastName()).toEqual(lastName);
    expect(admin.getEmail()).toEqual(email);
    expect(admin.getPassword()).toEqual(password);
});
test('given: invalid first name for admin, when: admin is created, then: an error is thrown.', () => {
    expect(() => createAdmin({ firstName: '' })).toThrow('The first name is required.');
});
test('given: invalid first name with less than 2 characters for admin, when: admin is created, then: an error is thrown.', () => {
    expect(() => createAdmin({ firstName: 'J' })).toThrow('The first name must be between 2 and 50 characters.');
});
test('given: invalid last name, when: admin is created for admin, then: an error is thrown.', () => {
    expect(() => createAdmin({ lastName: '' })).toThrow('The last name is required.');
});
test('given: invalid last name with less than 2 characters for admin, when: admin is created, then: an error is thrown.', () => {
    expect(() => createAdmin({ lastName: 'B' })).toThrow('The last name must be between 2 and 50 characters.');
});
test('given: invalid email for admin, when: admin is created, then: an error is thrown.', () => {
    expect(() => createAdmin({ email: '' })).toThrow('The email is required.');
});
test('given: invalid email format for admin, when: admin is created, then: an error is thrown.', () => {
    expect(() => createAdmin({ email: 'invalidEmail' })).toThrow('The email format is invalid.');
});
test('given: invalid password for admin, when: admin is created for admin, then: an error is thrown.', () => {
    expect(() => createAdmin({ password: '' })).toThrow('The password is required.');
});
test('given: invalid password less than 8 characters for admin, when: admin is created , then: an error is thrown.', () => {
    expect(() => createAdmin({ password: '1234567' })).toThrow('The password must be at least 8 characters long.');
});
