import { set } from 'date-fns';
import { Customer } from '../../model/customer';
import { Product } from '../../model/product';
import { Payment } from '../../model/payment';
import { Order } from '../../model/order';
import { OrderItem } from '../../model/orderItem';

const validCustomerTestData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'securepassword123',
    recentOrders: [],
    wishlist: [],
};

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

const validPaymentTestData = {
    amount: 60,
    date: set(new Date(), { year: 2024, month: 2, date: 23 }),
    paymentStatus: 'paid',
};

let customer: Customer;
let product: Product;
let payment: Payment;
let orderItem: OrderItem;

beforeEach(() => {
    customer = new Customer(validCustomerTestData);
    product = new Product(validProductTestData);
    payment = new Payment(validPaymentTestData);
    orderItem = new OrderItem({ product, quantity: 2 });
});

test('given valid values for order item, when: order item is created, then: order item is created with those values', () => {
    expect(orderItem.getProduct()).toEqual(product);
    expect(orderItem.getQuantity()).toEqual(2);
});

test('given invalid product, when: order item is created, then: error is thrown.', () => {
    expect(() => new OrderItem({ product: null as any, quantity: 2 })).toThrow(
        'Product cannot be null or undefined.'
    );
});

test('given invalid quantity, when: order item is created, then: error is thrown.', () => {
    expect(() => new OrderItem({ product, quantity: 0 })).toThrow(
        'Quantity must be greater than zero.'
    );
});
