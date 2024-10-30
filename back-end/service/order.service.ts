import { Order } from '../model/order';
import orderDb from '../repository/order.db';

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

export default {
    getOrders,
    getOrderById,
    deleteOrder,
};
