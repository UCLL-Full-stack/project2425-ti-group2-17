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
        wishlist: [],
        id: 1,
    }),
    new Customer({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'password456',
        recentOrders: [],
        wishlist: [],
        id: 2,
    }),
];

let mockCustomerDbGetCustomers: jest.Mock;
let mockCustomerDbGetCustomerById: jest.Mock;
let mockCustomerDbGetCustomerByEmail: jest.Mock;
let mockCustomerDbCreateCustomer: jest.Mock;
let mockCartDbCreateCart: jest.Mock;
let mockCustomerDbUpdateCustomer: jest.Mock;
let mockCustomerDbDeleteCustomer: jest.Mock;
let mockCartDbDeleteCart: jest.Mock;
let mockCartDbGetCartByCustomerId: jest.Mock;

beforeEach(() => {
    mockCustomerDbGetCustomers = jest.fn();
    mockCustomerDbGetCustomerById = jest.fn();
    mockCustomerDbGetCustomerByEmail = jest.fn();
    mockCustomerDbCreateCustomer = jest.fn();
    mockCartDbCreateCart = jest.fn();
    mockCustomerDbUpdateCustomer = jest.fn();
    mockCustomerDbDeleteCustomer = jest.fn();
    mockCartDbDeleteCart = jest.fn();
    mockCartDbGetCartByCustomerId = jest.fn();
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
        wishlist: [],
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
    expect(mockCartDbCreateCart).toHaveBeenCalledWith(createdCustomer);
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

test('given an existing customer, when updating customer details, then customer is updated', () => {
    const updatedCustomerData: CustomerInput = {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
        password: 'newpassword123',
    };

    const createdCustomer = new Customer({
        ...updatedCustomerData,
        recentOrders: [],
        wishlist: [],
        id: 1,
    });

    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(customers[0]);
    customerDb.updateCustomer = mockCustomerDbUpdateCustomer.mockReturnValue(createdCustomer);

    const result = customerService.updateCustomer(1, updatedCustomerData);

    expect(result.getFirstName()).toEqual(updatedCustomerData.firstName);
    expect(result.getLastName()).toEqual(updatedCustomerData.lastName);
    expect(result.getEmail()).toEqual(updatedCustomerData.email);
    expect(result.getPassword()).toEqual(updatedCustomerData.password);

    expect(mockCustomerDbGetCustomerById).toHaveBeenCalledWith({ id: 1 });
    expect(mockCustomerDbUpdateCustomer).toHaveBeenCalledWith(
        expect.objectContaining(updatedCustomerData)
    );
});

test('given a non-existent customer, when updating customer, then an error is thrown', () => {
    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(null);

    const updatedCustomerData: CustomerInput = {
        firstName: 'Non',
        lastName: 'Existent',
        email: 'non.existent@example.com',
        password: 'nopassword',
    };

    const updateCustomer = () => customerService.updateCustomer(4, updatedCustomerData);

    expect(updateCustomer).toThrow('This customer does not exist.');
    expect(mockCustomerDbGetCustomerById).toHaveBeenCalledWith({ id: 4 });
});

test('given an existing customer, when deleting the customer, then the customer is deleted', () => {
    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(customers[0]);
    cartDb.getCartByCustomerId = mockCartDbGetCartByCustomerId.mockReturnValue(customers[0]);
    cartDb.deleteCart = mockCartDbDeleteCart.mockReturnValue(
        new Cart({ customer: customers[0], products: [], id: 1 })
    );

    customerDb.deleteCustomer = mockCustomerDbDeleteCustomer.mockReturnValue(
        'Customer has been deleted.'
    );
    cartDb.deleteCart = mockCartDbDeleteCart.mockReturnValue('Cart deleted');

    const result = customerService.deleteCustomer(1);

    expect(result).toEqual('Customer has been deleted.');
    expect(mockCustomerDbGetCustomerById).toHaveBeenCalledWith({ id: 1 });
    expect(mockCartDbDeleteCart).toHaveBeenCalledWith({ id: 1 });
    expect(mockCustomerDbDeleteCustomer).toHaveBeenCalledWith({ id: 1 });
});

test('given a non-existent customer, when deleting the customer, then an error is thrown', () => {
    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(null);

    const deleteCustomer = () => customerService.deleteCustomer(4);

    expect(deleteCustomer).toThrow('This customer does not exist.');
    expect(mockCustomerDbGetCustomerById).toHaveBeenCalledWith({ id: 4 });
});

test('given a customer without a cart, when deleting the customer, then an error is thrown', () => {
    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(customers[1]);
    cartDb.getCartByCustomerId = mockCartDbGetCartByCustomerId.mockReturnValue(null);

    const deleteCustomer = () => customerService.deleteCustomer(2);

    expect(deleteCustomer).toThrow('That customer does not have a cart.');
    expect(mockCartDbGetCartByCustomerId).toHaveBeenCalledWith({ id: 2 });
});
