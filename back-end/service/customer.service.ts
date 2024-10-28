import { Customer } from '../model/customer';
import customerDB from '../repository/customer.db';

const getCustomers = (): Customer[] => customerDB.getCustomers();

const getCustomerById = (id: number): Customer => {
    const customer = customerDB.getCustomerById({ id });
    if (!customer) throw new Error(`Customer with id ${id} does not exist.`);
    return customer;
};

export default {
    getCustomers,
    getCustomerById,
};
