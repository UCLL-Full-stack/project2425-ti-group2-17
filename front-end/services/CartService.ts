const getAllCarts = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/carts', {
        method: 'GET',
        headers: {
            'content-Type': 'application/json',
        },
    });
};

const getCartById = (cartId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/carts/${cartId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getCartByEmail = (email: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/carts/email/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const addItemToCart = (email: string, productId: string, quantity: string) => {
    return fetch(
        process.env.NEXT_PUBLIC_API_URL + `/carts/addItems/${email}/${productId}/${quantity}`,
        {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json',
            },
        }
    );
};

const removeItemFromCart = (email: string, productId: string, quantity: string) => {
    return fetch(
        process.env.NEXT_PUBLIC_API_URL + `/carts/removeItems/${email}/${productId}/${quantity}`,
        {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json',
            },
        }
    );
};

const convertCartToOrder = (email: string, paymentStatus: string) => {
    return fetch(
        process.env.NEXT_PUBLIC_API_URL +
            `/carts/convertToOrder/${email}?paymentStatus=${paymentStatus}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
};

const CartService = {
    getAllCarts,
    getCartById,
    getCartByEmail,
    addItemToCart,
    removeItemFromCart,
    convertCartToOrder,
};

export default CartService;
