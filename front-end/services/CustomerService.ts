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

const CustomerService = {
    loginCustomer,
};

export default CustomerService;
