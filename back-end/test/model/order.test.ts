import { set } from 'date-fns';
import { Customer } from '../../model/customer';
import { Order } from '../../model/order';
import { OrderItem } from '../../model/orderItem';
import { Product } from '../../model/product';
import { Payment } from '../../model/payment';

test('given: valid values for order, when: order is created, then: order is created with those values', () => {
    const customer = new Customer({
        name: 'John Doe',
        email: 'john.doe@example.com',
    });

    const tShirt = new Product({
        name: 'T-Shirt',
        price: 30.0,
        stock: 100,
        category: ['Clothing', 'Men', 'Tops'],
        description: 'A comfortable cotton t-shirt',
        images: ['image1.jpg', 'image2.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Green'],
    });

    const date = set(new Date(), { year: 2024, month: 2, date: 23 });
    const payment = new Payment({ amount: 60, date, paymentStatus: 'paid' });

    const order = new Order({ customer, items: [], date, payment });
    order.addItem(tShirt, 2);

    expect(order.getCustomer()).toEqual(customer);
    expect(
        order
            .getItems()
            .some((orderItem) => orderItem.getProduct() === tShirt && orderItem.getQuantity() === 2)
    ).toBe(true);
    expect(order.getDate()).toEqual(date);
    expect(order.getPayment()).toEqual(payment);
});
