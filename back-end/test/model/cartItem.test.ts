import { Cart } from '../../model/cart';
import { CartItem } from '../../model/cartItem';
import { Customer } from '../../model/customer';
import { Product } from '../../model/product';

const customerTestData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    password: 'password',
    recentOrders: [],
};

const productTestData = {
    name: 'T-Shirt',
    price: 30.0,
    stock: 100,
    category: ['Clothing', 'Men', 'Tops'],
    description: 'A comfortable cotton t-shirt',
    images: ['image1.jpg', 'image2.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Green'],
};

let customer: Customer;
let product: Product;
let cart: Cart;
let cartItem: CartItem;

beforeEach(() => {
    customer = new Customer(customerTestData);
    product = new Product(productTestData);
    cart = new Cart({ customer, products: [] });
    cartItem = new CartItem({ cart, product, quantity: 2 });
});

test('given: valid values for cartItem, when: cartItem is created, then: cartItem is created with those values.', () => {
    expect(cartItem.getCart()).toEqual(cart);
    expect(cartItem.getProduct()).toEqual(product);
    expect(cartItem.getQuantity()).toEqual(2);
});

test('given: invalid cart, when: cartItem is created, then: error is thrown.', () => {
    expect(() => new CartItem({ cart: null as any, product, quantity: 2 })).toThrow(
        'Cart cannot be null or undefined.'
    );
});

test('given: invalid product, when: cartItem is created, then: error is thrown.', () => {
    expect(() => new CartItem({ cart, product: null as any, quantity: 2 })).toThrow(
        'Product cannot be null or undefined.'
    );
});

test('given: invalid quantity, when: cartItem is created, then: error is thrown.', () => {
    expect(() => new CartItem({ cart, product, quantity: 0 })).toThrow(
        'Quantity must be greater than zero.'
    );
});

test('given: valid cartItem, when: updateQuantity is called with valid new quantity, then: quantity is updated and stock adjusted.', () => {
    const previousQuantity = cartItem.getQuantity();
    const newQuantity = 5;
    const quantityDifference = newQuantity - previousQuantity;
    const previousProductStock = product.getStock();

    cartItem.updateQuantity(newQuantity);

    expect(cartItem.getQuantity()).toEqual(newQuantity);
    expect(product.getStock()).toEqual(previousProductStock - quantityDifference);
});

test('given: valid cartItem, when: updateQuantity is called with zero, then: error is thrown.', () => {
    expect(() => cartItem.updateQuantity(0)).toThrow('Quantity must be greater than zero.');
});

test('given: valid cartItem, when: updateQuantity is called with negative quantity, then: error is thrown.', () => {
    expect(() => cartItem.updateQuantity(-1)).toThrow('Quantity must be greater than zero.');
});

test('given: limited product stock, when: updateQuantity exceeds stock, then: error is thrown.', () => {
    product = new Product({ ...productTestData, stock: 2 });
    cartItem = new CartItem({ cart, product, quantity: 2 });

    expect(() => cartItem.updateQuantity(5)).toThrow(
        'Not enough stock available to update the quantity.'
    );
});

test('given: valid cartItem, when: updateQuantity decreases quantity, then: quantity updated and stock increased.', () => {
    const previousQuantity = cartItem.getQuantity();
    const newQuantity = 1;
    const quantityDifference = newQuantity - previousQuantity;
    const previousProductStock = product.getStock();

    cartItem.updateQuantity(newQuantity);

    expect(cartItem.getQuantity()).toEqual(newQuantity);
    expect(product.getStock()).toEqual(previousProductStock - quantityDifference);
});
