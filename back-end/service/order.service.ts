import { UnauthorizedError } from 'express-jwt';
import { Customer } from '../model/customer';
import { Order } from '../model/order';
import { OrderItem } from '../model/orderItem';
import { Payment } from '../model/payment';
import { Product } from '../model/product';
import customerDb from '../repository/customer.db';
import orderDb from '../repository/order.db';
import { OrderInput } from '../types';

const getOrders = async ({ email, role }: { email: string; role: string }): Promise<Order[]> => {
    if (role === 'admin' || role === 'salesman') {
        return orderDb.getOrders();
    } else if (role === 'customer') {
        return orderDb.getOrdersByCustomer({ email });
    } else {
        throw UnauthorizedError;
    }
};

const getOrderById = async (id: number): Promise<Order> => {
    const order = await orderDb.getOrderById({ id });

    if (!order) throw new Error(`Order with id ${id} does not exist.`);

    return order;
};

const deleteOrder = async (orderId: number): Promise<string> => {
    const existingOrder = await orderDb.getOrderById({ id: orderId });

    if (!existingOrder) throw new Error('This order does not exist.');

    return await orderDb.deleteOrder({ id: orderId });
};

const createOrder = async (orderInput: OrderInput): Promise<Order> => {
    const { customer, items, date, payment } = orderInput;

    if (!customer) throw new Error('Customer is required to create an order.');
    if (!items || items.length === 0) throw new Error('At least one order item is required.');
    if (!payment) throw new Error('Payment information is required.');

    let existingCustomer = await customerDb.getCustomerByEmail({ email: customer.email });
    let newCustomer;
    if (existingCustomer) {
        newCustomer = existingCustomer;
    } else {
        newCustomer = new Customer({
            ...customer,
            wishlist: [],
        });
    }

    const orderDate = new Date(date);
    const paymentDate = new Date(payment.date);

    const newPayment = new Payment({ ...payment, date: paymentDate });
    const newItems = items.map(
        (item) => new OrderItem({ product: new Product(item.product), quantity: item.quantity })
    );

    const orderId = (await orderDb.getOrders()).length + 1;

    const newOrder = new Order({
        customer: newCustomer,
        items: newItems,
        date: orderDate,
        payment: newPayment,
        id: orderId,
    });

    return await orderDb.createOrder(newOrder);
};

export default {
    getOrders,
    getOrderById,
    deleteOrder,
    createOrder,
};
