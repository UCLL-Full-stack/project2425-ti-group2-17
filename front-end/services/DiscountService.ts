const getAllDiscounts = () => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUser')!).token;
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/discounts', {
        method: 'GET',
        headers: {
            'content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const DiscountService = {
    getAllDiscounts,
};

export default DiscountService;
