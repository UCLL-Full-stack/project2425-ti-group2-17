import { Product } from '../../model/product';
import productDb from '../../repository/product.db';
import productService from '../../service/product.service';
import { ProductInput } from '../../types';

const products: Product[] = [
    new Product({
        name: 'Plain T-Shirt',
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
        name: 'Sports Shoes',
        price: 69.99,
        stock: 50,
        category: ['Footwear', 'Sports'],
        description: 'Lightweight and comfortable shoes designed for running.',
        images: ['https://example.com/images/shoes1.jpg'],
        sizes: ['M', 'L', 'XL'],
        colors: ['White', 'Black'],
        id: 2,
    }),
];

let mockProductDbCreateProduct: jest.Mock;
let mockProductDbGetProducts: jest.Mock;
let mockProductDbGetProductById: jest.Mock;
let mockProductDbGetProductByName: jest.Mock;
let mockProductDbUpdateProduct: jest.Mock;
let mockProductDbDeleteProduct: jest.Mock;

beforeEach(() => {
    mockProductDbCreateProduct = jest.fn();
    mockProductDbGetProducts = jest.fn();
    mockProductDbGetProductById = jest.fn();
    mockProductDbGetProductByName = jest.fn();
    mockProductDbUpdateProduct = jest.fn();
    mockProductDbDeleteProduct = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given products in the DB, when getting all products, then all products are returned', () => {
    productDb.getProducts = mockProductDbGetProducts.mockReturnValue(products);

    const result = productService.getProducts();

    expect(result).toEqual(products);
    expect(mockProductDbGetProducts).toHaveBeenCalled();
});

test('given products in the DB, when getting product by id, then product with that id is returned', () => {
    productDb.getProductById = mockProductDbGetProductById.mockReturnValue(products[0]);

    const result = productService.getProductById(1);

    expect(result).toEqual(products[0]);
    expect(mockProductDbGetProductById).toHaveBeenCalledWith({ id: 1 });
});

test('given products in the DB, when getting product by incorrect id, then an error is thrown', () => {
    productDb.getProductById = mockProductDbGetProductById.mockReturnValue(null);

    const getProductById = () => productService.getProductById(3);

    expect(getProductById).toThrow('Product with id 3 does not exist.');
    expect(mockProductDbGetProductById).toHaveBeenCalledWith({ id: 3 });
});

test('given a valid product input, when creating a new product, then it successfully creates the product', () => {
    const newProductInput: ProductInput = {
        name: 'Running Shoes',
        price: 79.99,
        stock: 30,
        category: ['Footwear', 'Sports'],
        description: 'Durable and comfortable running shoes.',
        images: ['https://example.com/images/runningshoes.jpg'],
        sizes: ['M', 'L', 'XL'],
        colors: ['Blue', 'Green'],
    };

    productDb.getProductByName = mockProductDbGetProductByName.mockReturnValue(null);
    productDb.getProducts = mockProductDbGetProducts.mockReturnValue(products);

    const createdProduct = new Product({
        ...newProductInput,
        id: 3,
    });
    productDb.createProduct = mockProductDbCreateProduct.mockReturnValue(createdProduct);

    const result = productService.createProduct(newProductInput);

    expect(result).toEqual(createdProduct);
    expect(mockProductDbGetProductByName).toHaveBeenCalledWith({ name: newProductInput.name });
    expect(mockProductDbCreateProduct).toHaveBeenCalledWith(createdProduct);
});

test('given an existing product, when creating that product again, then an error is thrown', () => {
    const newProductInput: ProductInput = {
        name: 'Plain T-Shirt',
        price: 19.99,
        stock: 100,
        category: ['Clothing', 'Tops'],
        description: 'A comfortable, everyday t-shirt available in multiple colors.',
        images: ['https://example.com/images/tshirt1.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Red', 'Blue', 'Black'],
    };

    productDb.getProductByName = mockProductDbGetProductByName.mockReturnValue(products[0]);

    const createProduct = () => productService.createProduct(newProductInput);

    expect(createProduct).toThrow('A product with this name already exists.');
    expect(mockProductDbGetProductByName).toHaveBeenCalledWith({ name: newProductInput.name });
    expect(mockProductDbCreateProduct).not.toHaveBeenCalled();
});

test('given an existing product, when updating product details, then product is updated', () => {
    const updatedProductData: ProductInput = {
        name: 'Plain T-Shirt',
        price: 24.99,
        stock: 80,
        category: ['Clothing', 'Tops'],
        description: 'A comfortable, everyday t-shirt available in multiple colors.',
        images: ['https://example.com/images/tshirt1.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Red', 'Blue', 'Black'],
    };

    const updatedProduct = new Product({
        ...updatedProductData,
        id: 1,
    });

    productDb.getProductById = mockProductDbGetProductById.mockReturnValue(products[0]);
    productDb.updateProduct = mockProductDbUpdateProduct.mockReturnValue(updatedProduct);

    const result = productService.updateProduct(1, updatedProductData);

    expect(result).toEqual(updatedProduct);
    expect(mockProductDbGetProductById).toHaveBeenCalledWith({ id: 1 });
    expect(mockProductDbUpdateProduct).toHaveBeenCalledWith(updatedProduct);
});

test('given a non-existent product, when updating product, then an error is thrown', () => {
    productDb.getProductById = mockProductDbGetProductById.mockReturnValue(null);

    const updatedProductData: ProductInput = {
        name: 'Non-Existent Product',
        price: 49.99,
        stock: 0,
        category: ['Unknown'],
        description: 'This product does not exist.',
        images: ['https://example.com/images/nonexistent.jpg'],
        sizes: ['N/A'],
        colors: ['N/A'],
    };

    const updateProduct = () => productService.updateProduct(3, updatedProductData);

    expect(updateProduct).toThrow('Product with id 3 does not exist.');
    expect(mockProductDbGetProductById).toHaveBeenCalledWith({ id: 3 });
});

test('given an existing product, when deleting the product, then the product is deleted', () => {
    productDb.getProductById = mockProductDbGetProductById.mockReturnValue(products[0]);
    productDb.deleteProduct = mockProductDbDeleteProduct.mockReturnValue(
        'Product has been deleted.'
    );

    const result = productService.deleteProduct(1);

    expect(result).toEqual('Product has been deleted.');
    expect(mockProductDbGetProductById).toHaveBeenCalledWith({ id: 1 });
    expect(mockProductDbDeleteProduct).toHaveBeenCalledWith({ id: 1 });
});

test('given a non-existent product, when deleting the product, then an error is thrown', () => {
    productDb.getProductById = mockProductDbGetProductById.mockReturnValue(null);

    const deleteProduct = () => productService.deleteProduct(3);

    expect(deleteProduct).toThrow('This product does not exist.');
    expect(mockProductDbGetProductById).toHaveBeenCalledWith({ id: 3 });
});
