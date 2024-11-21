import { Payment } from '../model/payment';
import database from './database';

// const payments: Payment[] = [
//     new Payment({
//         amount: 150.0,
//         date: new Date('2023-05-15'),
//         paymentStatus: 'paid',
//         id: 1,
//     }),
//     new Payment({
//         amount: 200.0,
//         date: new Date('2023-07-20'),
//         paymentStatus: 'unpaid',
//         id: 2,
//     }),
//     new Payment({
//         amount: 75.5,
//         date: new Date('2023-08-10'),
//         paymentStatus: 'paid',
//         id: 3,
//     }),
//     new Payment({
//         amount: 320.0,
//         date: new Date('2023-09-25'),
//         paymentStatus: 'unpaid',
//         id: 4,
//     }),
//     new Payment({
//         amount: 100.0,
//         date: new Date('2023-10-05'),
//         paymentStatus: 'paid',
//         id: 5,
//     }),
// ];

const addPayment = async (payment: Payment): Promise<Payment> => {
    try {
        const paymentPrisma = await database.payment.create({
            data: {
                amount: payment.getAmount(),
                date: payment.getDate(),
                paymentStatus: payment.getPaymentStatus(),
            },
        });
        return Payment.from(paymentPrisma);
    } catch (error) {
        throw error;
    }
};

const getPayments = async (): Promise<Payment[]> => {
    try {
        const paymentsPrisma = await database.payment.findMany();
        return paymentsPrisma.map(Payment.from);
    } catch (error) {
        throw error;
    }
};

const getPaymentById = async ({ id }: { id: number }): Promise<Payment | null> => {
    try {
        const paymentPrisma = await database.payment.findUnique({
            where: { id: id },
        });

        if (!paymentPrisma) {
            return null;
        }
        return Payment.from(paymentPrisma);
    } catch (error) {
        throw error;
    }
};

export default {
    addPayment,
    getPayments,
    getPaymentById,
};
