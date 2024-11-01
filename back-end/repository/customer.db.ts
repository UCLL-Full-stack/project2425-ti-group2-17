import { Customer } from '../model/customer';
import { Product } from '../model/product';
import productDb from './product.db';

const products: Product[] = productDb.getProducts();

const customers: Customer[] = [
    new Customer({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        recentOrders: [],
        wishlist: [products[0]],
        id: 1,
    }),
    new Customer({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'password456',
        recentOrders: [],
        wishlist: [products[1]],
        id: 2,
    }),
    new Customer({
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        password: 'password789',
        recentOrders: [],
        wishlist: [products[2]],
        id: 3,
    }),
];

const getCustomers = (): Customer[] => customers;

const getCustomerById = ({ id }: { id: number }): Customer | null => {
    return customers.find((customer) => customer.getId() === id) || null;
};

const getCustomerByEmail = ({ email }: { email: string }): Customer | null => {
    return customers.find((customer) => customer.getEmail() === email) || null;
};

const createCustomer = (customer: Customer): Customer => {
    customers.push(customer);
    return customer;
};

const updateCustomer = (updatedCustomer: Customer): Customer => {
    const index = customers.findIndex((customer) => customer.getId() === updatedCustomer.getId());

    if (index === -1) {
        throw new Error('There is no customer with that id.');
    }

    customers[index] = updatedCustomer;
    return customers[index];
};

const deleteCustomer = ({ id }: { id: number }) => {
    const customerIndex = customers.findIndex((customer) => customer.getId() === id);

    customers.splice(customerIndex, 1);
    return 'Customer has been deleted.';
};

const addProductToWishlist = (customer: Customer, product: Product): Product => {
    return customer.addProductToWishlist(product);
};

const removeProductFromWishlist = (customer: Customer, product: Product): string => {
    return customer.removeProductFromWishlist(product);
};

export default {
    getCustomers,
    getCustomerById,
    createCustomer,
    getCustomerByEmail,
    updateCustomer,
    deleteCustomer,
    addProductToWishlist,
    removeProductFromWishlist,
};
