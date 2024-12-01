import { Product } from '@types';

const getAllProducts = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/products', {
        method: 'GET',
        headers: {
            'content-Type': 'application/json',
        },
    });
};

const createProduct = (product: Product) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
};

const updateProduct = (productId: string, product: Product) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
};

const deleteProduct = (productId: string) => {
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
