import { Product } from '../model/product';
import productDb from '../repository/product.db';
import { ProductInput } from '../types';

const createProduct = ({
    name,
    price,
    stock,
    category,
    description,
    images,
    sizes,
    colors,
}: ProductInput) => {
    const existingProduct = productDb.getProductByName({ name });

    if (existingProduct) throw new Error('A product with this name already exists.');

    const productId = productDb.getProducts().length + 1;

    const product = new Product({
        name,
        price,
        stock,
        category,
        description,
        images,
        sizes,
        colors,
        id: productId,
    });

    return productDb.createProduct(product);
};

const getProducts = (): Product[] => productDb.getProducts();

const getProductById = (id: number): Product => {
    const product = productDb.getProductById({ id });

    if (!product) throw new Error(`Product with id ${id} does not exist.`);

    return product;
};

const getProductsBySearch = (query: string): Product[] => {
    if (!query) {
        throw new Error('Search query is required');
    }
    return productDb.getProductsBySearch(query);
};

const updateProduct = (id: number, productData: Partial<ProductInput>): Product => {
    const existingProduct = productDb.getProductById({ id });

    if (!existingProduct) throw new Error(`Product with id ${id} does not exist.`);

    existingProduct.validate({
        name: productData.name || existingProduct.getName(),
        price: productData.price || existingProduct.getPrice(),
        stock: productData.stock || existingProduct.getStock(),
        category: productData.category || existingProduct.getCategory(),
        description: productData.description || existingProduct.getDescription(),
        images: productData.images || existingProduct.getImages(),
        sizes: productData.sizes || existingProduct.getSizes(),
        colors: productData.colors || existingProduct.getColors(),
    });

    if (productData.name) existingProduct.setName(productData.name);
    if (productData.price) existingProduct.setPrice(productData.price);
    if (productData.stock) existingProduct.setStock(productData.stock);
    if (productData.category) existingProduct.setCategory(productData.category);
    if (productData.description) existingProduct.setDescription(productData.description);
    if (productData.images) existingProduct.setImages(productData.images);
    if (productData.sizes) existingProduct.setSizes(productData.sizes);
    if (productData.colors) existingProduct.setColors(productData.colors);

    return productDb.updateProduct(existingProduct);
};

const deleteProduct = (productId: number): string => {
    const existingProduct = productDb.getProductById({ id: productId });

    if (!existingProduct) throw new Error('This product does not exist.');

    return productDb.deleteProduct({ id: productId });
};

export default {
    createProduct,
    getProducts,
    getProductById,
    getProductsBySearch,
    updateProduct,
    deleteProduct,
};
