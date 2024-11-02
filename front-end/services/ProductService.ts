import { ProductInput } from '@types';

const getAllProducts = async () => {
    // try {
    //     const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/products', {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/products', {
        method: 'GET',
        headers: {
            'content-Type': 'application/json',
        },
    });
    //     if (!response.ok) {
    //         const errorResponse = await response.json();
    //         throw new Error(errorResponse.message);
    //     }

    //     return response.json();
    // } catch (error) {
    //     throw error;
    // }
};

const createProduct = async (productData: ProductInput) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
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

const updateProduct = async (productId: string, productData: ProductInput) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
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

const deleteProduct = async (productId: string) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/products/${productId}`, {
            method: 'DELETE',
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

const ProductService = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};

export default ProductService;
