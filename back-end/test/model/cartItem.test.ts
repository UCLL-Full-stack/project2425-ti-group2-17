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
    cartItem = new CartItem({ product, quantity: 2 });
});

test('given: valid values for cartItem, when: cartItem is created, then: cartItem is created with those values.', () => {
    expect(cartItem.getProduct()).toEqual(product);
    expect(cartItem.getQuantity()).toEqual(2);
});

test('given: invalid product, when: cartItem is created, then: error is thrown.', () => {
    expect(() => new CartItem({ product: null as any, quantity: 2 })).toThrow(
        'Product cannot be null or undefined.'
    );
});

test('given: invalid quantity, when: cartItem is created, then: error is thrown.', () => {
    expect(() => new CartItem({ product, quantity: 0 })).toThrow(
        'Quantity must be greater than zero.'
    );
});
