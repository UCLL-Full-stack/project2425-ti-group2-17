// import { Payment } from '../model/payment';
// import orderDb from '../repository/order.db';
// import paymentDb from '../repository/payment.db';
// import { PaymentInput } from '../types';

// const makePayment = (orderId: number, paymentInput: PaymentInput): Payment => {
//     const order = orderDb.getOrderById({ id: orderId });

//     if (!order) {
//         throw new Error(`Order with id ${orderId} does not exist.`);
//     }

//     if (order.getPayment().getPaymentStatus() === 'paid') {
//         throw new Error(`Order with id ${orderId} is already paid.`);
//     }

//     const orderTotalAmount = order.getTotalAmount();
//     if (paymentInput.amount !== orderTotalAmount) {
//         throw new Error(
//             `Payment amount ${paymentInput.amount} does not match order total amount ${orderTotalAmount}.`
//         );
//     }

//     const paymentId = paymentDb.getPayments().length + 1;
//     const payment = new Payment({ ...paymentInput, id: paymentId });
//     paymentDb.addPayment(payment);
//     order.getPayment().pay();

//     return payment;
// };

// const getPayments = (): Payment[] => paymentDb.getPayments();

// const getPaymentById = (id: number): Payment => {
//     const payment = paymentDb.getPaymentById({ id });

//     if (!payment) throw new Error(`Payment with id ${id} does not exist.`);

//     return payment;
// };

// export default {
//     makePayment,
//     getPayments,
//     getPaymentById,
// };
