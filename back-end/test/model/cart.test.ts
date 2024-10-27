import { Cart } from '../../model/cart';
import { CartItem } from '../../model/cartItem';
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
    customer = new Customer({ ...customerTestData, recentOrders: [] });
    product = new Product(productTestData);
    cart = new Cart({ customer, products: [] });
});

test('given: valid values for cart, when: cart is created, then: cart is created with those values.', () => {
    expect(cart.getCustomer()).toEqual(customer);
    expect(cart.getProducts()).toHaveLength(0);
});

test('given: valid cart, when: cart item is added to cart, then: cart item is added to products array.', () => {
    cart.addItem(product, 2);

    expect(cart.getProducts()).toHaveLength(1);
});
test('given: invalid customer, when: cart is created, then: an error is thrown.', () => {
    expect(() => new Cart({ customer: null as any, products: [] })).toThrow(
        'Customer cannot be null or undefined.'
    );
});

test('given: invalid quantity, when: cart item is added to cart, then: an error is thrown.', () => {
    expect(() => cart.addItem(product, -1)).toThrow('Quantity must be greater than zero.');
});

test('given: product not in cart, when: product is added, then: product is added as a new CartItem.', () => {
    cart.addItem(product, 2);

    expect(cart.getProducts()).toHaveLength(1);
    expect(cart.getProducts()[0].getProduct()).toEqual(product);
    expect(cart.getProducts()[0].getQuantity()).toBe(2);
});

test('given: product already in cart, when: same product is added again, then: quantity is updated.', () => {
    cart.addItem(product, 2);
    cart.addItem(product, 3);

    expect(cart.getProducts()).toHaveLength(1);
    expect(cart.getProducts()[0].getQuantity()).toBe(5);
});

test('given: multiple products, when: each is added to the cart, then: all are present in the cart.', () => {
    const product2 = new Product({ ...productTestData, name: 'Jeans', price: 50.0, id: 2 });
    cart.addItem(product, 2);
    cart.addItem(product2, 1);

    expect(cart.getProducts()).toHaveLength(2);
    expect(cart.getProducts()[0].getProduct()).toEqual(product);
    expect(cart.getProducts()[1].getProduct()).toEqual(product2);
});
