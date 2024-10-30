import { Customer } from '../model/customer';
import { User } from '../model/user';
import cartDb from '../repository/cart.db';
import customerDB from '../repository/customer.db';
import { CustomerInput } from '../types';
import cartService from './cart.service';

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
        wishlist: [],
        id: customerId,
    });

    const existingCart = cartDb.getCartByCustomerEmail({
        email: customer.getEmail(),
    });

    if (existingCart) throw new Error('This customer already has a cart.');

    cartDb.createCart(customer);

    return customerDB.createCustomer(customer);
};

const updateCustomer = (
    id: number,
    { firstName, lastName, email, password }: CustomerInput
): Customer => {
    const existingCustomer = customerDB.getCustomerById({ id });

    if (!existingCustomer) throw new Error('This customer does not exist.');

    const newUserData = { firstName, lastName, email, password };

    existingCustomer.updateUser(newUserData);

    return customerDB.updateCustomer(existingCustomer);
};

const deleteCustomer = (customerId: number): string => {
    const existingCustomer = customerDB.getCustomerById({ id: customerId });

    if (!existingCustomer) throw new Error('This customer does not exist.');

    const existingCart = cartDb.getCartByCustomerId({ id: customerId });

    if (!existingCart) {
        throw new Error('That customer does not have a cart.');
    }

    cartDb.deleteCart({ id: existingCart.getId()! });

    return customerDB.deleteCustomer({ id: customerId });
};

export default {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
