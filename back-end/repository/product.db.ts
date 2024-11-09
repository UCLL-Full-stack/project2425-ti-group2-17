import { Product } from '../model/product';
import database from './database';

const products: Product[] = [
    new Product({
        name: 'Basic T-Shirt',
        price: 19.99,
        stock: 100,
        category: ['Clothing', 'Tops'],
        description: 'A comfortable, everyday t-shirt available in multiple colors.',
        images: ['https://example.com/images/tshirt1.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Red', 'Blue', 'Black'],
        id: 1,
    }),
    new Product({
        name: 'Running Shoes',
        price: 79.99,
        stock: 50,
        category: ['Footwear', 'Sports'],
        description: 'Lightweight and comfortable shoes designed for running.',
        images: ['https://example.com/images/shoes1.jpg'],
        sizes: ['M', 'L', 'XL'],
        colors: ['White', 'Black'],
        id: 2,
    }),
    new Product({
        name: 'Casual Hoodie',
        price: 39.99,
        stock: 75,
        category: ['Clothing', 'Outerwear'],
        description: 'A cozy hoodie perfect for casual wear.',
        images: ['https://example.com/images/hoodie1.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Gray', 'Navy'],
        id: 3,
    }),
    new Product({
        name: 'Classic Watch',
        price: 99.99,
        stock: 30,
        category: ['Accessories', 'Watches'],
        description: 'A classic watch with a sleek design.',
        images: ['https://example.com/images/watch1.jpg'],
        sizes: ['M'],
        colors: ['Black', 'Silver'],
        id: 4,
    }),
    new Product({
        name: 'Denim Jeans',
        price: 49.99,
        stock: 60,
        category: ['Clothing', 'Bottoms'],
        description: 'Classic denim jeans with a comfortable fit.',
        images: ['https://example.com/images/jeans1.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Blue', 'Black'],
        id: 5,
    }),
];

const createProduct = (product: Product): Product => {
    products.push(product);
    return product;
};

const getProducts = (): Product[] => products;

// const getProductById = ({ id }: { id: number }): Product | null => {
//     return products.find((product) => product.getId() === id) || null;
// };

const getProductById = async ({ id }: { id: number }): Promise<Product | null> => {
    try {
        const productPrisma = await database.product.findUnique({
            where: { id: id },
        });

        if (!productPrisma) {
            return null;
        }
        return Product.from(productPrisma);
    } catch (error) {
        throw new Error('Database Error. See server log for details.');
    }
};

const getProductByName = ({ name }: { name: string }): Product | null => {
    return products.find((product) => product.getName() === name) || null;
};

const getProductsBySearch = (query: string): Product[] => {
    const lowerQuery = query.toLowerCase();

    return products.filter(
        (product) =>
            product.getName().toLowerCase().includes(lowerQuery) ||
            product.getCategory().some((cat) => cat.toLowerCase().includes(lowerQuery)) ||
            product.getDescription().toLowerCase().includes(lowerQuery)
    );
};

const updateProduct = (updatedProduct: Product): Product => {
    const index = products.findIndex((product) => product.getId() === updatedProduct.getId());

    if (index === -1) {
        throw new Error(`Product with id ${updatedProduct.getId()} does not exist.`);
    }

    products[index] = updatedProduct;
    return products[index];
};

const deleteProduct = ({ id }: { id: number }) => {
    const productIndex = products.findIndex((product) => product.getId() === id);

    products.splice(productIndex, 1);
    return 'Product has been deleted.';
};

export default {
    createProduct,
    getProducts,
    getProductById,
    getProductByName,
    getProductsBySearch,
    updateProduct,
    deleteProduct,
};
