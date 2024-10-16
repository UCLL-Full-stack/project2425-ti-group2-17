import { set } from 'date-fns';
import { Payment } from '../../model/payment';

test('given: valid values for payment, when: payment is created, then: payment is created with those values', () => {
    const date = set(new Date(), { year: 2024, month: 2, date: 23 });

    const payment = new Payment({ amount: 60, date, paymentStatus: 'paid' });

    expect(payment.getAmount()).toEqual(60);
    expect(payment.getDate()).toEqual(date);
    expect(payment.getPaymentStatus()).toEqual('paid');
});
