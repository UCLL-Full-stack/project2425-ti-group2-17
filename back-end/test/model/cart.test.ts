import { Cart } from '../../model/cart';
import { Customer } from '../../model/customer';
import { Product } from '../../model/product';

const customerTestData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    password: 'password',
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

beforeEach(() => {
    customer = new Customer({ ...customerTestData, recentOrders: [], wishlist: [] });
    product = new Product(productTestData);
    cart = new Cart({ customer, products: [] });
});

test('given: valid values for cart, when: cart is created, then: cart is created with those values.', () => {
    expect(cart.getCustomer()).toEqual(customer);
    expect(cart.getProducts()).toHaveLength(0);
    expect(cart.getTotalAmount()).toEqual(0);
});

test('given: product not in cart, when: product is added, then: product is added as a new CartItem.', () => {
    cart.addItem(product, 2);

    expect(cart.getProducts()).toHaveLength(1);
    expect(cart.getProducts()[0].getProduct()).toEqual(product);
    expect(cart.getProducts()[0].getQuantity()).toEqual(2);
    expect(cart.getTotalAmount()).toEqual(60);
});

test('given: invalid customer, when: cart is created, then: an error is thrown.', () => {
    expect(() => new Cart({ customer: null as any, products: [] })).toThrow(
        'Customer cannot be null or undefined.'
    );
});

test('given: invalid quantity, when: cart item is added to cart, then: an error is thrown.', () => {
    expect(() => cart.addItem(product, -1)).toThrow('Quantity must be greater than zero.');
});

test('given: product already in cart, when: same product is added again, then: quantity is updated and stock remains the same.', () => {
    cart.addItem(product, 2);
    cart.addItem(product, 3);

    expect(cart.getProducts()).toHaveLength(1);
    expect(cart.getProducts()[0].getQuantity()).toEqual(5);
    expect(product.getStock()).toEqual(100);
    expect(cart.getTotalAmount()).toEqual(150);
});

test('given: product in cart, when: decrease quantity, then: quantity is decreased.', () => {
    cart.addItem(product, 5);
    const result = cart.removeItem(product, 3);

    expect(result).toEqual(cart.getProducts()[0]);
    expect(cart.getProducts()[0].getQuantity()).toEqual(2);
    expect(cart.getTotalAmount()).toEqual(60);
});

test('given: product in cart, when: decrease quantity to zero, then: item is removed from cart.', () => {
    cart.addItem(product, 5);
    const result = cart.removeItem(product, 5);

    expect(result).toEqual('Item removed from cart.');
    expect(cart.getProducts()).toHaveLength(0);
    expect(cart.getTotalAmount()).toEqual(0);
});

test('given: product not in cart, when: removing item, then: error is thrown.', () => {
    expect(() => cart.removeItem(product, 1)).toThrow('Product not in cart.');
});

test('given: product in cart, when: removing more items than there are in the cart, then: error is thrown.', () => {
    cart.addItem(product, 2);
    expect(() => cart.removeItem(product, 5)).toThrow(
        'There are not that many products in the cart to remove.'
    );
});

test('given: invalid quantity, when: removing item, then: error is thrown.', () => {
    expect(() => cart.removeItem(product, 0)).toThrow('Quantity must be greater than zero.');
});
