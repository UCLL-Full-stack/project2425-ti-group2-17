import { Customer } from '../../model/customer';

const customerTestData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    password: 'password',
};

let customer: Customer;

beforeEach(() => {
    customer = new Customer({ ...customerTestData, recentOrders: [] });
});

const { firstName, lastName, email, password } = customerTestData;

const createCustomer = (overrides = {}) =>
    new Customer({ ...customerTestData, recentOrders: [], ...overrides });

test('given: valid values for customer, when: customer is created, then: customer is created with those values.', () => {
    expect(customer.getFirstName()).toEqual(firstName);
    expect(customer.getLastName()).toEqual(lastName);
    expect(customer.getEmail()).toEqual(email);
    expect(customer.getPassword()).toEqual(password);
    expect(customer.getRecentOrders()).toHaveLength(0);
});

test('given: invalid first name for customer, when: customer is created, then: an error is thrown.', () => {
    expect(() => createCustomer({ firstName: '' })).toThrow('The first name is required.');
});

test('given: invalid first name with less than 2 characters for customer, when: customer is created, then: an error is thrown.', () => {
    expect(() => createCustomer({ firstName: 'J' })).toThrow(
        'The first name must be between 2 and 50 characters.'
    );
});

test('given: invalid last name, when: customer is created for customer, then: an error is thrown.', () => {
    expect(() => createCustomer({ lastName: '' })).toThrow('The last name is required.');
});

test('given: invalid last name with less than 2 characters for customer, when: customer is created, then: an error is thrown.', () => {
    expect(() => createCustomer({ lastName: 'B' })).toThrow(
        'The last name must be between 2 and 50 characters.'
    );
});

test('given: invalid email for customer, when: customer is created, then: an error is thrown.', () => {
    expect(() => createCustomer({ email: '' })).toThrow('The email is required.');
});

test('given: invalid email format for customer, when: customer is created, then: an error is thrown.', () => {
    expect(() => createCustomer({ email: 'invalidEmail' })).toThrow('The email format is invalid.');
});

test('given: invalid password for customer, when: customer is created, then: an error is thrown.', () => {
    expect(() => createCustomer({ password: '' })).toThrow('The password is required.');
});

test('given: invalid password less than 8 characters for customer, when: customer is created , then: an error is thrown.', () => {
    expect(() => createCustomer({ password: '1234567' })).toThrow(
        'The password must be at least 8 characters long.'
    );
});

test('given: valid values for update, when: updating the admin, then: admin is updated with those values.', () => {
    const updatedData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@gmail.com',
        password: 'newpassword456',
    };

    customer.updateUser(updatedData);

    expect(customer.getFirstName()).toEqual(updatedData.firstName);
    expect(customer.getLastName()).toEqual(updatedData.lastName);
    expect(customer.getEmail()).toEqual(updatedData.email);
    expect(customer.getPassword()).toEqual(updatedData.password);
});
