import { Customer } from '../model/customer';

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
    new Customer({
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        password: 'password789',
        recentOrders: [],
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

export default {
    getCustomers,
    getCustomerById,
    createCustomer,
    getCustomerByEmail,
};
