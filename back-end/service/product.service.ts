import { Product } from '../model/product';
import productDb from '../repository/product.db';
import { ProductInput } from '../types';

const createProduct = async ({
    name,
    price,
    stock,
    categories,
    description,
    images,
    sizes,
    colors,
}: ProductInput): Promise<Product> => {
    const existingProduct = await productDb.getProductByName({ name });

    if (existingProduct) throw new Error('A product with this name already exists.');

    const productId = (await productDb.getProducts()).length + 1;

    const product = new Product({
        name,
        price,
        stock,
        categories,
        description,
        images,
        sizes,
        colors,
        id: productId,
    });

    return productDb.createProduct(product);
};

const getProducts = async (): Promise<Product[]> => await productDb.getProducts();

const getProductById = async (id: number): Promise<Product> => {
    const product = await productDb.getProductById({ id });

    if (!product) throw new Error(`Product with id ${id} does not exist.`);

    return product;
};

const getProductsBySearch = async (query: string): Promise<Product[]> => {
    if (!query) {
        throw new Error('Search query is required');
    }
    return await productDb.getProductsBySearch(query);
};

const updateProduct = async (id: number, productData: Partial<ProductInput>): Promise<Product> => {
    const existingProduct = await productDb.getProductById({ id });

    if (!existingProduct) throw new Error(`Product with id ${id} does not exist.`);

    existingProduct.validate({
        name: productData.name || existingProduct.getName(),
        price: productData.price || existingProduct.getPrice(),
        stock: productData.stock || existingProduct.getStock(),
        categories: productData.categories || existingProduct.getCategories(),
        description: productData.description || existingProduct.getDescription(),
        images: productData.images || existingProduct.getImages(),
        sizes: productData.sizes || existingProduct.getSizes(),
        colors: productData.colors || existingProduct.getColors(),
    });

    if (productData.name) existingProduct.setName(productData.name);
    if (productData.price) existingProduct.setPrice(productData.price);
    if (productData.stock) existingProduct.setStock(productData.stock);
    if (productData.categories) existingProduct.setCategories(productData.categories);
    if (productData.description) existingProduct.setDescription(productData.description);
    if (productData.images) existingProduct.setImages(productData.images);
    if (productData.sizes) existingProduct.setSizes(productData.sizes);
    if (productData.colors) existingProduct.setColors(productData.colors);

    return await productDb.updateProduct(existingProduct);
};

const deleteProduct = async (productId: number): Promise<string> => {
    const existingProduct = await productDb.getProductById({ id: productId });

    if (!existingProduct) throw new Error('This product does not exist.');

    return await productDb.deleteProduct({ id: productId });
};

export default {
    createProduct,
    getProducts,
    getProductById,
    getProductsBySearch,
    updateProduct,
    deleteProduct,
};
