import { CustomerInput } from '@types';

const loginCustomer = async (email: string, password: string) => {
    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + `/customers/login/${email}/${password}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

const createCustomer = async (customer: CustomerInput) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/customers/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

const CustomerService = {
    loginCustomer,
    createCustomer,
};

export default CustomerService;
