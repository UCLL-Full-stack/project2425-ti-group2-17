import { set } from 'date-fns';
import { Customer } from '../../model/customer';
import { Product } from '../../model/product';
import { Payment } from '../../model/payment';
import { Order } from '../../model/order';
import { OrderItem } from '../../model/orderItem';

test('given valid values for order item, when: order item is created, then: order item is created with those values', () => {
    const customer = new Customer({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'securepassword123',
        recentOrders: [],
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

    const quantity = 2;
    const orderItem = new OrderItem({ order, product: tShirt, quantity });

    expect(orderItem.getOrder()).toEqual(order);
    expect(orderItem.getProduct()).toEqual(tShirt);
    expect(orderItem.getQuantity()).toEqual(quantity);
});
