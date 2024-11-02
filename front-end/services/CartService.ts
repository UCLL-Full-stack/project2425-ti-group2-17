const getAllCarts = async () => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/carts', {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};

const addItemToCart = async (cartId: string, productId: string, quantity: string) => {
    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + `/carts/addItems/${cartId}/${productId}/${quantity}`,
            {
                method: 'PUT',
                headers: {
                    'content-Type': 'application/json',
                },
            }
        );
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};

const CartService = {
    getAllCarts,
    addItemToCart,
};

export default CartService;
