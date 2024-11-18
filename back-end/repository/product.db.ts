import { Product } from '../model/product';
import database from './database';

const createProduct = async (product: Product): Promise<Product> => {
    try {
        const productPrisma = await database.product.create({
            data: {
                name: product.getName(),
                price: product.getPrice(),
                stock: product.getStock(),
                categories: { set: product.getCategories() },
                description: product.getDescription(),
                images: { set: product.getImages() },
                sizes: { set: product.getSizes() },
                colors: { set: product.getColors() },
            },
        });
        return Product.from(productPrisma);
    } catch (error) {
        throw error;
    }
};

const getProducts = async (): Promise<Product[]> => {
    try {
        const productsPrisma = await database.product.findMany();
        return productsPrisma.map(Product.from);
    } catch (error) {
        throw error;
    }
};

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

const getProductByName = async ({ name }: { name: string }): Promise<Product | null> => {
    try {
        const productPrisma = await database.product.findUnique({
            where: { name: name },
        });

        if (!productPrisma) {
            return null;
        }
        return Product.from(productPrisma);
    } catch (error) {
        throw error;
    }
};

const getProductsBySearch = async (query: string): Promise<Product[]> => {
    try {
        const productsPrisma = await database.product.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { categories: { hasSome: [query] } },
                    { description: { contains: query } },
                ],
            },
        });
        return productsPrisma.map(Product.from);
    } catch (error) {
        throw error;
    }
};

const updateProduct = async (updatedProduct: Product): Promise<Product> => {
    try {
        const productPrisma = await database.product.update({
            where: { id: updatedProduct.getId() },
            data: {
                name: updatedProduct.getName(),
                price: updatedProduct.getPrice(),
                stock: updatedProduct.getStock(),
                categories: { set: updatedProduct.getCategories() },
                description: updatedProduct.getDescription(),
                images: { set: updatedProduct.getImages() },
                sizes: { set: updatedProduct.getSizes() },
                colors: { set: updatedProduct.getColors() },
            },
        });
        return Product.from(productPrisma);
    } catch (error) {
        throw error;
    }
};

const deleteProduct = async ({ id }: { id: number }): Promise<string> => {
    try {
        await database.cartItem.deleteMany({
            where: { productId: id },
        });

        await database.product.delete({
            where: { id: id },
        });
        return 'Product has been deleted.';
    } catch (error) {
        throw error;
    }
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
