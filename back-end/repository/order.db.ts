import { Customer } from '../model/customer';
import { Order } from '../model/order';
import { OrderItem } from '../model/orderItem';
import { Payment } from '../model/payment';
import { Product } from '../model/product';
import customerDb from './customer.db';
import productDb from './product.db';

const customers: Customer[] = customerDb.getCustomers();

const products: Product[] = productDb.getProducts();

const orderItem1 = new OrderItem({
    product: products[0],
    quantity: 2,
});

const orderItem2 = new OrderItem({
    product: products[1],
    quantity: 1,
});

const order1 = new Order({
    customer: customers[0],
    items: [orderItem1, orderItem2],
    date: new Date(),
    payment: new Payment({
        amount: 0,
        date: new Date(),
        paymentStatus: 'unpaid',
    }),
    id: 1,
});

order1.getPayment().setAmount(order1.getTotalAmount());
order1.getPayment().pay();

const orderItem3 = new OrderItem({
    product: products[0],
    quantity: 3,
});

const order2 = new Order({
    customer: customers[0],
    items: [orderItem3],
    date: new Date(),
    payment: new Payment({
        amount: 0,
        date: new Date(),
        paymentStatus: 'unpaid',
    }),
    id: 2,
});

order2.getPayment().setAmount(order2.getTotalAmount());

const orders: Order[] = [order1, order2];

const getOrders = (): Order[] => orders;

const getOrderById = ({ id }: { id: number }): Order | undefined => {
    const order = orders.find((order) => order.getId() === id);
    return order;
};

const getOrdersByCustomer = ({ id }: { id: number }): Order[] => {
    return orders.filter((order) => order.getCustomer().getId() === id);
};

const deleteOrder = ({ id }: { id: number }) => {
    const orderIndex = orders.findIndex((order) => order.getId() === id);

    orders.splice(orderIndex, 1);
    return 'Order has been deleted.';
};

const createOrder = (order: Order): Order => {
    orders.push(order);
    return order;
};

export default {
    getOrders,
    getOrderById,
    getOrdersByCustomer,
    deleteOrder,
    createOrder,
};
