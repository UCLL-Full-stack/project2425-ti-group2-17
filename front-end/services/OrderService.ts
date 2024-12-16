const getAllOrders = () => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUser')!).token;
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/orders', {
        method: 'GET',
        headers: {
            'content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const OrderService = {
    getAllOrders,
};

export default OrderService;
