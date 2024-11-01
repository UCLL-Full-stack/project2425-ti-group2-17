import { ProductInput } from '@types';

const getAllProducts = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/products', {
        method: 'GET',
        headers: {
            'content-Type': 'application/json',
        },
    });
};

const updateProduct = async (productId: string, productData: ProductInput) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });
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
    updateProduct,
    deleteProduct,
};

export default ProductService;
