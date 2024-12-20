import { UnauthorizedError } from 'express-jwt';
import { Payment } from '../model/payment';
import orderDb from '../repository/order.db';
import paymentDb from '../repository/payment.db';
import { PaymentInput, Role } from '../types';

const makePayment = async (
    orderId: number,
    paymentInput: PaymentInput,
    email: string,
    role: Role
): Promise<Payment> => {
    const order = await orderDb.getOrderById({ id: orderId });

    if (!order) {
        throw new Error(`Order with id ${orderId} does not exist.`);
    }

    if (role === 'customer' && order.getCustomer().getEmail() === email) {
        const order = await orderDb.getOrderById({ id: orderId });

        if (!order) {
            throw new Error(`Order with id ${orderId} does not exist.`);
        }

        if (order.getPayment().getPaymentStatus() === 'paid') {
            throw new Error(`Order with id ${orderId} is already paid.`);
        }

        const orderTotalAmount = await order.calculateTotalAmount();
        if (paymentInput.amount !== orderTotalAmount) {
            throw new Error(
                `Payment amount ${paymentInput.amount} does not match order total amount ${orderTotalAmount}.`
            );
        }

        const payment = await paymentDb.addPayment({ orderId, amount: paymentInput.amount });

        return payment;
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'You must be logged in as a customer to make a payment.',
        });
    }
};

const getPayments = async (email: string, role: Role): Promise<Payment[]> => {
    if (role === 'salesman' || role === 'admin') {
        return await paymentDb.getPayments();
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'You must be a salesman or admin to access all payments.',
        });
    }
};

const getPaymentById = async (id: number, email: string, role: Role): Promise<Payment> => {
    if (role === 'salesman' || role === 'admin') {
        const payment = await paymentDb.getPaymentById({ id });

        if (!payment) throw new Error(`Payment with id ${id} does not exist.`);

        return payment;
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'You must be a salesman or admin to access a payment by id.',
        });
    }
};

export default {
    makePayment,
    getPayments,
    getPaymentById,
};
