import { Customer } from '../model/customer';
import { Order } from '../model/order';
import { OrderItem } from '../model/orderItem';
import { Payment } from '../model/payment';
import { Product } from '../model/product';
import customerDb from '../repository/customer.db';
import orderDb from '../repository/order.db';
import { OrderInput } from '../types';

const getOrders = (): Order[] => {
    return orderDb.getOrders();
};

const getOrderById = (id: number): Order => {
    const order = orderDb.getOrderById({ id });

    if (!order) throw new Error(`Order with id ${id} does not exist.`);

    return order;
};

const deleteOrder = (orderId: number): string => {
    const existingOrder = orderDb.getOrderById({ id: orderId });

    if (!existingOrder) throw new Error('This order does not exist.');

    return orderDb.deleteOrder({ id: orderId });
};

const createOrder = (orderInput: OrderInput): Order => {
    const { customer, items, date, payment } = orderInput;

    if (!customer) throw new Error('Customer is required to create an order.');
    if (!items || items.length === 0) throw new Error('At least one order item is required.');
    if (!payment) throw new Error('Payment information is required.');

    let existingCustomer = customerDb.getCustomerByEmail({ email: customer.email });
    let newCustomer;
    if (existingCustomer) {
        newCustomer = existingCustomer;
    } else {
        newCustomer = new Customer({
            ...customer,
            recentOrders: [],
            wishlist: [],
        });
    }

    const orderDate = new Date(date);
    const paymentDate = new Date(payment.date);

    const newPayment = new Payment({ ...payment, date: paymentDate });
    const newItems = items.map(
        (item) => new OrderItem({ product: new Product(item.product), quantity: item.quantity })
    );

    const orderId = orderDb.getOrders().length + 1;

    const newOrder = new Order({
        customer: newCustomer,
        items: newItems,
        date: orderDate,
        payment: newPayment,
        id: orderId,
    });

    return orderDb.createOrder(newOrder);
};

export default {
    getOrders,
    getOrderById,
    deleteOrder,
    createOrder,
};
