const getAllProducts = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/products', {
        method: 'GET',
        headers: {
            'content-Type': 'application/json',
        },
    });
};

const ProductService = {
    getAllProducts,
};

export default ProductService;
