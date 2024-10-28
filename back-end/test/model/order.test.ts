import { set } from 'date-fns';
import { Customer } from '../../model/customer';
import { Product } from '../../model/product';
import { Payment } from '../../model/payment';
import { Order } from '../../model/order';

const customerTestData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'securepassword123',
    recentOrders: [],
    wishlist: [],
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

const paymentTestData = {
    amount: 60,
    date: set(new Date(), { year: 2024, month: 2, date: 23 }),
    paymentStatus: 'paid',
};

let customer: Customer;
let product: Product;
let payment: Payment;
let order: Order;

beforeEach(() => {
    customer = new Customer(customerTestData);
    product = new Product(productTestData);
    payment = new Payment(paymentTestData);
    order = new Order({ customer, items: [], date: paymentTestData.date, payment });
    order.addItem(product, 2);
});

test('given: valid values for order, when: order is created, then: order is created with those values', () => {
    expect(order.getCustomer()).toEqual(customer);
    expect(
        order
            .getItems()
            .some(
                (orderItem) => orderItem.getProduct() === product && orderItem.getQuantity() === 2
            )
    ).toBe(true);
    expect(order.getDate()).toEqual(paymentTestData.date);
    expect(order.getPayment()).toEqual(payment);
});

test('given: invalid customer, when: order is created, then: error is thrown.', () => {
    expect(
        () => new Order({ customer: null as any, items: [], date: paymentTestData.date, payment })
    ).toThrow('Customer cannot be null or undefined.');
});

test('given: invalid payment, when: order is created, then: error is thrown.', () => {
    expect(
        () => new Order({ customer, items: [], date: paymentTestData.date, payment: null as any })
    ).toThrow('Payment cannot be null or undefined.');
});

test('given: invalid date, when: order is created, then: error is thrown.', () => {
    expect(
        () => new Order({ customer, items: [], date: new Date('invalid-date-string'), payment })
    ).toThrow('Invalid date provided.');
});

test('given: future date, when: order is created, then: error is thrown.', () => {
    expect(
        () =>
            new Order({
                customer,
                items: [],
                date: set(new Date(), { year: 2124, month: 2, date: 23 }),
                payment,
            })
    ).toThrow('Order date cannot be in the future.');
});
