import { Payment } from '../model/payment';
import orderDb from '../repository/order.db';
import paymentDb from '../repository/payment.db';
import { PaymentInput } from '../types';

const makePayment = async (orderId: number, paymentInput: PaymentInput): Promise<Payment> => {
    const order = await orderDb.getOrderById({ id: orderId });

    if (!order) {
        throw new Error(`Order with id ${orderId} does not exist.`);
    }

    if (order.getPayment().getPaymentStatus() === 'paid') {
        throw new Error(`Order with id ${orderId} is already paid.`);
    }

    const orderTotalAmount = order.calculateTotalAmount();
    if (paymentInput.amount !== orderTotalAmount) {
        throw new Error(
            `Payment amount ${paymentInput.amount} does not match order total amount ${orderTotalAmount}.`
        );
    }

    const payment = await paymentDb.addPayment({ orderId, amount: paymentInput.amount });

    return payment;
};

const getPayments = async (): Promise<Payment[]> => await paymentDb.getPayments();

const getPaymentById = async (id: number): Promise<Payment> => {
    const payment = await paymentDb.getPaymentById({ id });

    if (!payment) throw new Error(`Payment with id ${id} does not exist.`);

    return payment;
};

export default {
    makePayment,
    getPayments,
    getPaymentById,
};
