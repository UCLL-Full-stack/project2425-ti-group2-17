import { Customer } from '../model/customer';
import customerDB from '../repository/customer.db';
import { CustomerInput } from '../types';

const getCustomers = (): Customer[] => customerDB.getCustomers();

const getCustomerById = (id: number): Customer => {
    const customer = customerDB.getCustomerById({ id });
    if (!customer) throw new Error(`Customer with id ${id} does not exist.`);
    return customer;
};

const createCustomer = ({ firstName, lastName, email, password }: CustomerInput): Customer => {
    const existingCustomer = customerDB.getCustomerByEmail({ email });
    if (existingCustomer) throw new Error('A customer with this email already exists.');

    const customerId = customerDB.getCustomers().length + 1;
    const customer = new Customer({
        firstName,
        lastName,
        email,
        password,
        recentOrders: [],
        id: customerId,
    });
    return customerDB.createCustomer(customer);
};

export default {
    getCustomers,
    getCustomerById,
    createCustomer,
};