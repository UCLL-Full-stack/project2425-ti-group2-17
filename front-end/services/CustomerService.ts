import { Customer } from '@types';

const loginCustomer = (customer: Customer) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/customers/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
    });
};

const createCustomer = (customer: Customer) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/customers/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
    });
};

const CustomerService = {
    loginCustomer,
    createCustomer,
};

export default CustomerService;
