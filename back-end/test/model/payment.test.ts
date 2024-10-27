import { set } from 'date-fns';
import { Payment } from '../../model/payment';

const validPaymentTestData = {
    amount: 60,
    date: set(new Date(), { year: 2024, month: 2, date: 23 }),
    paymentStatus: 'paid',
};

let payment: Payment;

beforeEach(() => {
    payment = new Payment(validPaymentTestData);
});

const { amount, date, paymentStatus } = validPaymentTestData;

const createPayment = (overrides = {}) => new Payment({ ...validPaymentTestData, ...overrides });

test('given: valid values for payment, when: payment is created, then: payment is created with those values', () => {
    expect(payment.getAmount()).toEqual(60);
    expect(payment.getDate()).toEqual(date);
    expect(payment.getPaymentStatus()).toEqual('paid');
});

test('given: no amount for payment, when: payment is created, then: an error is thrown.', () => {
    expect(() => createPayment({ amount: 0 })).toThrow('Amount must be greater than zero.');
});

test('given: invalid paymentStatus for payment, when: payment is created, then: an error is thrown.', () => {
    expect(() => createPayment({ paymentStatus: 'false' })).toThrow(
        'Payment status must be either paid or unpaid.'
    );
});

test('given: invalid date format for payment, when: payment is created, then: an error is thrown.', () => {
    expect(() => createPayment({ date: new Date('invalid-date-string') })).toThrow(
        'Invalid date provided.'
    );
});

test('given: future date for payment, when: payment is created, then: an error is thrown.', () => {
    expect(() =>
        createPayment({ date: set(new Date(), { year: 2124, month: 2, date: 23 }) })
    ).toThrow('Payment date cannot be in the future.');
});

test('given: paid payment, when: payment is initialized, then: an error is thrown.', () => {
    expect(() => payment.pay()).toThrow('Payment has already been made.');
});
