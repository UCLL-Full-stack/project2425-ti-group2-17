import { Cart } from '../../model/cart';
import { Customer } from '../../model/customer';
import { Order } from '../../model/order';
import { OrderItem } from '../../model/orderItem';
import { Payment } from '../../model/payment';
import { Product } from '../../model/product';
import cartDb from '../../repository/cart.db';
import customerDb from '../../repository/customer.db';
// import orderDb from '../../repository/order.db';
import productDb from '../../repository/product.db';
import customerService from '../../service/customer.service';
import { CustomerInput } from '../../types';

const products: Product[] = [
    new Product({
        name: 'Plain T-Shirt',
        price: 19.99,
        stock: 100,
        categories: ['Clothing', 'Tops'],
        description: 'A comfortable, everyday t-shirt available in multiple colors.',
        images: ['https://example.com/images/tshirt1.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Red', 'Blue', 'Black'],
        id: 1,
    }),
    new Product({
        name: 'Sports Shoes',
        price: 69.99,
        stock: 50,
        categories: ['Footwear', 'Sports'],
        description: 'Lightweight and comfortable shoes designed for running.',
        images: ['https://example.com/images/shoes1.jpg'],
        sizes: ['M', 'L', 'XL'],
        colors: ['White', 'Black'],
        id: 2,
    }),
];

const customers: Customer[] = [
    new Customer({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        wishlist: [products[0]],
        id: 1,
    }),
    new Customer({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'password456',
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
let mockCustomerDbAddProductToWishlist: jest.Mock;
let mockCustomerDbRemoveProductFromWishlist: jest.Mock;
let mockProductDbGetProductById: jest.Mock;

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
    mockCustomerDbAddProductToWishlist = jest.fn();
    mockCustomerDbRemoveProductFromWishlist = jest.fn();
    mockProductDbGetProductById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given customers in the DB, when getting all customers, then all customers are returned', async () => {
    customerDb.getCustomers = mockCustomerDbGetCustomers.mockResolvedValue(customers);

    const result = await customerService.getCustomers();

    expect(result).toEqual(customers);
    expect(mockCustomerDbGetCustomers).toHaveBeenCalled();
});

test('given customers in the DB, when getting customer by id, then customer with that id is returned', async () => {
    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(customers[0]);

    const result = await customerService.getCustomerById(1);

    expect(result).toEqual(customers[0]);
    expect(mockCustomerDbGetCustomerById).toHaveBeenCalledWith({ id: 1 });
});

test('given customers in the DB, when getting customer by incorrect id, then an error is thrown', async () => {
    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(null);

    const getCustomerById = async () => await customerService.getCustomerById(3);

    await expect(getCustomerById()).rejects.toThrow('Customer with id 3 does not exist.');
    expect(mockCustomerDbGetCustomerById).toHaveBeenCalledWith({ id: 3 });
});

test('given a valid customer input, when creating a new customer, then it successfully creates the customer', async () => {
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
        wishlist: [],
        id: undefined,
    });
    customerDb.createCustomer = mockCustomerDbCreateCustomer.mockReturnValue(createdCustomer);

    const cart = new Cart({ customer: createdCustomer, products: [] });

    cartDb.createCart = mockCartDbCreateCart.mockReturnValue(cart);

    const result = await customerService.createCustomer(newCustomerInput);

    expect(result).toEqual(createdCustomer);
    expect(mockCustomerDbGetCustomerByEmail).toHaveBeenCalledWith({
        email: newCustomerInput.email,
    });
    expect(mockCustomerDbCreateCustomer).toHaveBeenCalledWith(createdCustomer);
    expect(mockCartDbCreateCart).toHaveBeenCalledWith(createdCustomer);
});

test('given an existing customer, when creating that customer again, then an error is thrown', async () => {
    const newCustomerInput: CustomerInput = {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'john.doe@example.com',
        password: 'password789',
    };

    customerDb.getCustomerByEmail = mockCustomerDbGetCustomerByEmail.mockReturnValue(customers[0]);

    const createCustomer = async () => await customerService.createCustomer(newCustomerInput);

    await expect(createCustomer).rejects.toThrow('A customer with this email already exists.');
    expect(mockCustomerDbGetCustomerByEmail).toHaveBeenCalledWith({
        email: newCustomerInput.email,
    });
    expect(mockCustomerDbCreateCustomer).not.toHaveBeenCalled();
});

test('given an existing customer, when updating customer details, then customer is updated', async () => {
    const updatedCustomerData: CustomerInput = {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
        password: 'newpassword123',
    };

    const createdCustomer = new Customer({
        ...updatedCustomerData,
        wishlist: [],
        id: 1,
    });

    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(customers[0]);
    customerDb.updateCustomer = mockCustomerDbUpdateCustomer.mockReturnValue(createdCustomer);

    const result = await customerService.updateCustomer(1, updatedCustomerData);

    expect(result.getFirstName()).toEqual(updatedCustomerData.firstName);
    expect(result.getLastName()).toEqual(updatedCustomerData.lastName);
    expect(result.getEmail()).toEqual(updatedCustomerData.email);
    expect(result.getPassword()).toEqual(updatedCustomerData.password);

    expect(mockCustomerDbGetCustomerById).toHaveBeenCalledWith({ id: 1 });
    expect(mockCustomerDbUpdateCustomer).toHaveBeenCalledWith(
        expect.objectContaining(updatedCustomerData)
    );
});

test('given a non-existent customer, when updating customer, then an error is thrown', async () => {
    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(null);

    const updatedCustomerData: CustomerInput = {
        firstName: 'Non',
        lastName: 'Existent',
        email: 'non.existent@example.com',
        password: 'nopassword',
    };

    const updateCustomer = async () => await customerService.updateCustomer(4, updatedCustomerData);

    await expect(updateCustomer).rejects.toThrow('This customer does not exist.');
    expect(mockCustomerDbGetCustomerById).toHaveBeenCalledWith({ id: 4 });
});

test('given an existing customer, when deleting the customer, then the customer is deleted', async () => {
    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(customers[0]);
    cartDb.getCartByCustomerId = mockCartDbGetCartByCustomerId.mockReturnValue(customers[0]);
    cartDb.deleteCart = mockCartDbDeleteCart.mockReturnValue(
        new Cart({ customer: customers[0], products: [], id: 1 })
    );

    customerDb.deleteCustomer = mockCustomerDbDeleteCustomer.mockReturnValue(
        'Customer has been deleted.'
    );
    cartDb.deleteCart = mockCartDbDeleteCart.mockReturnValue('Cart deleted');

    const result = await customerService.deleteCustomer(1);

    expect(result).toEqual('Customer has been deleted.');
    expect(mockCustomerDbGetCustomerById).toHaveBeenCalledWith({ id: 1 });
    expect(mockCartDbDeleteCart).toHaveBeenCalledWith({ id: 1 });
    expect(mockCustomerDbDeleteCustomer).toHaveBeenCalledWith({ id: 1 });
});

test('given a non-existent customer, when deleting the customer, then an error is thrown', async () => {
    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(null);

    const deleteCustomer = async () => await customerService.deleteCustomer(4);

    await expect(deleteCustomer).rejects.toThrow('This customer does not exist.');
    expect(mockCustomerDbGetCustomerById).toHaveBeenCalledWith({ id: 4 });
});

test('given a customer without a cart, when deleting the customer, then an error is thrown', async () => {
    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(customers[1]);
    cartDb.getCartByCustomerId = mockCartDbGetCartByCustomerId.mockReturnValue(null);

    const deleteCustomer = async () => await customerService.deleteCustomer(2);

    await expect(deleteCustomer).rejects.toThrow('That customer does not have a cart.');
    expect(mockCartDbGetCartByCustomerId).toHaveBeenCalledWith({ id: 2 });
});

test('given a customer, when adding a product to wishlist, then the product is added', async () => {
    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(customers[0]);
    productDb.getProductById = mockProductDbGetProductById.mockReturnValue(products[1]);
    customerDb.addProductToWishlist = mockCustomerDbAddProductToWishlist.mockReturnValue(
        products[1]
    );

    const result = await customerService.addProductToWishlist(1, 2);

    expect(result).toEqual(products[1]);
    expect(mockCustomerDbAddProductToWishlist).toHaveBeenCalledWith(customers[0], products[1]);
});

test('given a customer with existing wishlist, when adding a duplicate product to wishlist, then an error is thrown', async () => {
    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(customers[0]);
    productDb.getProductById = mockProductDbGetProductById.mockReturnValue(products[0]);

    const addProductToWishlist = async () => await customerService.addProductToWishlist(1, 1);

    await expect(addProductToWishlist).rejects.toThrow(
        'Product with id 1 is already in the wishlist.'
    );
});

test('given a customer, when removing a product from wishlist, then the product is removed', async () => {
    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(customers[0]);
    productDb.getProductById = mockProductDbGetProductById.mockReturnValue(products[0]);
    customerDb.removeProductFromWishlist = mockCustomerDbRemoveProductFromWishlist.mockReturnValue(
        'Product removed from wishlist.'
    );

    const result = await customerService.removeProductFromWishlist(1, 1);

    expect(result).toEqual('Product removed from wishlist.');
    expect(mockCustomerDbRemoveProductFromWishlist).toHaveBeenCalledWith(customers[0], products[0]);
});

test('given a customer, when removing a product not in the wishlist, then an error is thrown', async () => {
    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(customers[0]);
    productDb.getProductById = mockProductDbGetProductById.mockReturnValue(products[1]);

    const removeProductFromWishlist = async () =>
        await customerService.removeProductFromWishlist(1, 2);

    await expect(removeProductFromWishlist).rejects.toThrow(
        'Product with id 2 is not in the wishlist.'
    );
});

test('given a non-existent product, when adding to wishlist, then an error is thrown', async () => {
    customerDb.getCustomerById = mockCustomerDbGetCustomerById.mockReturnValue(customers[0]);
    productDb.getProductById = mockProductDbGetProductById.mockReturnValue(null);

    const addProductToWishlist = async () => await customerService.addProductToWishlist(1, 3);

    await expect(addProductToWishlist).rejects.toThrow('Product with id 3 does not exist.');
});
