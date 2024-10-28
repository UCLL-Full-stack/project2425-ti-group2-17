import { Cart } from '../../model/cart';
import { Customer } from '../../model/customer';
import cartDb from '../../repository/cart.db';
import customerDb from '../../repository/customer.db';
import customerService from '../../service/customer.service';
import { CustomerInput } from '../../types';

const customers: Customer[] = [
    new Customer({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        recentOrders: [],
        id: 1,
    }),
    new Customer({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'password456',
        recentOrders: [],
        id: 2,
    }),
];

let mockCustomerDbGetCustomers: jest.Mock;
let mockCustomerDbGetCustomerById: jest.Mock;
let mockCustomerDbGetCustomerByEmail: jest.Mock;
let mockCustomerDbCreateCustomer: jest.Mock;
let mockCartDbCreateCart: jest.Mock;

beforeEach(() => {
    mockCustomerDbGetCustomers = jest.fn();
    mockCustomerDbGetCustomerById = jest.fn();
    mockCustomerDbGetCustomerByEmail = jest.fn();
    mockCustomerDbCreateCustomer = jest.fn();
    mockCartDbCreateCart = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given customers in the DB, when getting all customers, then all customers are returned', () => {
    customerDb.getCustomers = mockCustomerDbGetCustomers.mockReturnValue(customers);

    const result = customerService.getCustomers();

    expect(result).toEqual(customers);
    expect(mockCustomerDbGetCustomers).toHaveBeenCalled();
});

test('given customers in the DB, when getting customer by id, then customer with that id is returned', () => {
    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(customers[0]);

    const result = customerService.getCustomerById(1);

    expect(result).toEqual(customers[0]);
    expect(mockCustomerDbGetCustomerById).toHaveBeenCalledWith({ id: 1 });
});

test('given customers in the DB, when getting customer by incorrect id, then an error is thrown', () => {
    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(null);

    const getCustomerById = () => customerService.getCustomerById(3);

    expect(getCustomerById).toThrow('Customer with id 3 does not exist.');
    expect(mockCustomerDbGetCustomerById).toHaveBeenCalledWith({ id: 3 });
});

test('given a valid customer input, when creating a new customer, then it successfully creates the customer', () => {
    const newCustomerInput: CustomerInput = {
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob.johnson@example.com',
        password: 'password789',
    };

    customerDb.getCustomerByEmail = mockCustomerDbGetCustomerByEmail.mockReturnValue(null);
    customerDb.getCustomerById = mockCustomerDbGetCustomers.mockReturnValue(customers);

    const createdCustomer = new Customer({
        ...newCustomerInput,
        recentOrders: [],
        id: 3,
    });
    customerDb.createCustomer = mockCustomerDbCreateCustomer.mockReturnValue(createdCustomer);

    const cart = new Cart({ customer: createdCustomer, products: [] });

    cartDb.createCart = mockCartDbCreateCart.mockReturnValue(cart);

    const result = customerService.createCustomer(newCustomerInput);

    expect(result).toEqual(createdCustomer);
    expect(mockCustomerDbGetCustomerByEmail).toHaveBeenCalledWith({
        email: newCustomerInput.email,
    });
    expect(mockCustomerDbCreateCustomer).toHaveBeenCalledWith(createdCustomer);
    expect(mockCartDbCreateCart).toHaveBeenCalledWith(cart);
});

test('given an existing customer, when creating that customer again, then an error is thrown', () => {
    const newCustomerInput: CustomerInput = {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'john.doe@example.com',
        password: 'password789',
    };

    customerDb.getCustomerByEmail = mockCustomerDbGetCustomerByEmail.mockReturnValue(customers[0]);

    const createCustomer = () => customerService.createCustomer(newCustomerInput);

    expect(createCustomer).toThrow('A customer with this email already exists.');
    expect(mockCustomerDbGetCustomerByEmail).toHaveBeenCalledWith({
        email: newCustomerInput.email,
    });
    expect(mockCustomerDbCreateCustomer).not.toHaveBeenCalled();
});
