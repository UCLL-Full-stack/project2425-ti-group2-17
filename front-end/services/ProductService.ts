import { ProductInput } from '@types';

const getAllProducts = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/products', {
        method: 'GET',
        headers: {
            'content-Type': 'application/json',
        },
    });
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
            const errorMessage = await response.text();
            throw new Error(errorMessage || 'Failed to create product');
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
            const errorMessage = await response.text();
            throw new Error(errorMessage || 'Failed to update product');
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};

const deleteProduct = async (productId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'content-Type': 'application/json',
        },
    });
};

const ProductService = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};

export default ProductService;
