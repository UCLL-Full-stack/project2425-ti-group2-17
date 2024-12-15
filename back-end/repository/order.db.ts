import { Customer } from '../model/customer';
import { Order } from '../model/order';
import { OrderItem } from '../model/orderItem';
import { Payment } from '../model/payment';
import { Product } from '../model/product';
import database from './database';

const getOrders = async (): Promise<Order[]> => {
    try {
        const ordersPrisma = await database.order.findMany({
            include: { customer: true, items: { include: { product: true } }, payment: true },
        });
        // return ordersPrisma.map((orderPrisma) => {
        //     return Order.from({
        //         ...orderPrisma,
        //         customer: new Customer({ ...orderPrisma.customer, wishlist: [] }),
        //         items: orderPrisma.items.map(
        //             (itemData) =>
        //                 new OrderItem({
        //                     ...itemData,
        //                     product: new Product(itemData.product),
        //                 })
        //         ),
        //         payment: new Payment(orderPrisma.payment),
        //     });
        // });
        return ordersPrisma.map((orderPrisma) => Order.from(orderPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getOrderById = async ({ id }: { id: number }): Promise<Order | undefined> => {
    try {
        const orderPrisma = await database.order.findUnique({
            where: { id },
            include: { customer: true, items: { include: { product: true } }, payment: true },
        });

        if (!orderPrisma) {
            return undefined;
        }

        // return Order.from({
        //     ...orderPrisma,
        //     customer: new Customer({ ...orderPrisma.customer, wishlist: [] }),
        //     items: orderPrisma.items.map(
        //         (itemData) =>
        //             new OrderItem({
        //                 ...itemData,
        //                 product: new Product(itemData.product),
        //             })
        //     ),
        //     payment: new Payment(orderPrisma.payment),
        // });

        return Order.from(orderPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getOrdersByCustomer = async ({ id }: { id: number }): Promise<Order[]> => {
    try {
        const ordersPrisma = await database.order.findMany({
            where: { customerId: id },
            include: { customer: true, items: { include: { product: true } }, payment: true },
        });
        // return ordersPrisma.map((orderPrisma) => {
        //     return Order.from({
        //         ...orderPrisma,
        //         customer: new Customer({ ...orderPrisma.customer, wishlist: [] }),
        //         items: orderPrisma.items.map(
        //             (itemData) =>
        //                 new OrderItem({
        //                     ...itemData,
        //                     product: new Product(itemData.product),
        //                 })
        //         ),
        //         payment: new Payment(orderPrisma.payment),
        //     });
        // });

        return ordersPrisma.map((order) => Order.from(order));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteOrder = async ({ id }: { id: number }): Promise<string> => {
    try {
        await database.$transaction([
            database.orderItem.deleteMany({
                where: { orderId: id },
            }),

            database.order.delete({
                where: { id },
            }),
        ]);
        return 'Order has been deleted.';
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createOrder = async (order: Order): Promise<Order> => {
    try {
        const orderPrisma = await database.order.create({
            data: {
                customer: { connect: { id: order.getCustomer().getId() } },
                items: {
                    create: order.getItems().map((item) => ({
                        product: { connect: { id: item.getProduct().getId() } },
                        quantity: item.getQuantity(),
                    })),
                },
                date: order.getDate(),
                payment: {
                    create: {
                        amount: order.getPayment().getAmount(),
                        date: order.getDate(),
                        paymentStatus: order.getPayment().getPaymentStatus(),
                    },
                    // create: {
                    //     amount: order.calculateTotalAmount(),
                    //     date: order.getDate(),
                    //     paymentStatus: order.getPayment().getPaymentStatus(),
                    // },
                },
            },
            include: { customer: true, items: { include: { product: true } }, payment: true },
        });
        return Order.from(orderPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getOrders,
    getOrderById,
    getOrdersByCustomer,
    deleteOrder,
    createOrder,
};
