import { Payment } from '../model/payment';

const payments: Payment[] = [
    new Payment({
        amount: 150.0,
        date: new Date('2023-05-15'),
        paymentStatus: 'paid',
        id: 1,
    }),
    new Payment({
        amount: 200.0,
        date: new Date('2023-07-20'),
        paymentStatus: 'unpaid',
        id: 2,
    }),
    new Payment({
        amount: 75.5,
        date: new Date('2023-08-10'),
        paymentStatus: 'paid',
        id: 3,
    }),
    new Payment({
        amount: 320.0,
        date: new Date('2023-09-25'),
        paymentStatus: 'unpaid',
        id: 4,
    }),
    new Payment({
        amount: 100.0,
        date: new Date('2023-10-05'),
        paymentStatus: 'paid',
        id: 5,
    }),
];

const addPayment = (payment: Payment): Payment => {
    payments.push(payment);
    return payment;
};

const getPayments = (): Payment[] => payments;

const getPaymentById = ({ id }: { id: number }): Payment | null => {
    return payments.find((payment) => payment.getId() === id) || null;
};

export default {
    addPayment,
    getPayments,
    getPaymentById,
};
