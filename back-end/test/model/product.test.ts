import { Product } from '../../model/product';

const validProductTestData = {
    name: 'T-Shirt',
    price: 30.0,
    stock: 100,
    category: ['Clothing', 'Men', 'Tops'],
    description: 'A comfortable cotton t-shirt',
    images: ['image1.jpg', 'image2.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Green'],
};

let product: Product;

beforeEach(() => {
    product = new Product(validProductTestData);
});

const { name, price, stock, category, description, images, sizes, colors } = validProductTestData;

const createProduct = (overrides = {}) => new Product({ ...validProductTestData, ...overrides });

test('given: valid values for product, when: product is created, then: product is created with those values', () => {
    expect(product.getName()).toEqual('T-Shirt');
    expect(product.getPrice()).toEqual(30.0);
    expect(product.getStock()).toEqual(100);
    expect(product.getCategory()).toEqual(['Clothing', 'Men', 'Tops']);
    expect(product.getDescription()).toEqual('A comfortable cotton t-shirt');
    expect(product.getImages()).toEqual(['image1.jpg', 'image2.jpg']);
    expect(product.getSizes()).toEqual(['S', 'M', 'L', 'XL']);
    expect(product.getColors()).toEqual(['Black', 'White', 'Green']);
});

test('given: no name for product, when: product is created, then: an error is thrown.', () => {
    expect(() => createProduct({ name: '' })).toThrow('The product name is required.');
});

test('given: invalid name length for product, when: product is created, then: an error is thrown.', () => {
    expect(() => createProduct({ name: 'a' })).toThrow(
        'The product name must be between 2 and 50 characters.'
    );
});

test('given: invalid price for product, when: product is created, then: an error is thrown.', () => {
    expect(() => createProduct({ price: 0 })).toThrow('Price must be greater than zero.');
});

test('given: negative stock for product, when: product is created, then: an error is thrown.', () => {
    expect(() => createProduct({ stock: -1 })).toThrow('Stock must be positive.');
});

test('given: no category for product, when: product is created, then: an error is thrown.', () => {
    expect(() => createProduct({ category: [] })).toThrow(
        'Product must belong to at least one category.'
    );
});

test('given: no description for product, when: product is created, then: an error is thrown.', () => {
    expect(() => createProduct({ description: '' })).toThrow(
        'The product description is required.'
    );
});

test('given: no images for product, when: product is created, then: an error is thrown.', () => {
    expect(() => createProduct({ images: [] })).toThrow('Product must have at least one image.');
});

test('given: no sizes for product, when: product is created, then: an error is thrown.', () => {
    expect(() => createProduct({ sizes: [] })).toThrow(
        'Product must be available in at least one size.'
    );
});

test('given: invalid size for product, when: product is created, then: an error is thrown.', () => {
    expect(() => createProduct({ sizes: ['s'] })).toThrow(
        'All sizes must be "XS" or "S" or "M" or "L" or "XL".'
    );
});

test('given: no colors for product, when: product is created, then: an error is thrown.', () => {
    expect(() => createProduct({ colors: [] })).toThrow(
        'Product must be available in at least one color.'
    );
});
