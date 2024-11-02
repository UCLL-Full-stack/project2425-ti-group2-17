const getAllCarts = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/carts', {
        method: 'GET',
        headers: {
            'content-Type': 'application/json',
        },
    });
};

const addItemToCart = async (cartId: string, productId: string, quantity: string) => {
    return fetch(
        process.env.NEXT_PUBLIC_API_URL + `/carts/addItems/${cartId}/${productId}/${quantity}`,
        {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json',
            },
        }
    );
};

const CartService = {
    getAllCarts,
    addItemToCart,
};

export default CartService;
