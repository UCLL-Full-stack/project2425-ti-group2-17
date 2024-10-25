import { Customer } from '../model/customer';
import customerDb from '../repository/customer.db';

const getCustomers = (): Customer[] => customerDb.getCustomers();

export default {
    getCustomers,
};
