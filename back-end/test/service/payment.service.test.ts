import paymentService from '../../service/payment.service';
import orderDb from '../../repository/order.db';
import paymentDb from '../../repository/payment.db';
import { PaymentInput } from '../../types';
import { Payment } from '../../model/payment';

let mockOrderDbGetOrderById: jest.Mock;
let mockPaymentDbGetPayments: jest.Mock;
let mockPaymentDbGetPaymentById: jest.Mock;
let mockPaymentDbAddPayment: jest.Mock;

beforeEach(() => {
    mockOrderDbGetOrderById = jest.fn();
    mockPaymentDbGetPayments = jest.fn();
    mockPaymentDbGetPaymentById = jest.fn();
    mockPaymentDbAddPayment = jest.fn();

    orderDb.getOrderById = mockOrderDbGetOrderById;
    paymentDb.getPayments = mockPaymentDbGetPayments;
    paymentDb.getPaymentById = mockPaymentDbGetPaymentById;
    paymentDb.addPayment = mockPaymentDbAddPayment;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid order and payment input, when making a payment, then it successfully creates the payment', () => {
    const order = {
        getPayment: jest.fn().mockReturnValue({
            getPaymentStatus: jest.fn().mockReturnValue('unpaid'),
            pay: jest.fn(),
        }),
        getTotalAmount: jest.fn().mockReturnValue(100),
    };
    const paymentInput: PaymentInput = {
        amount: 100,
        date: new Date(),
        paymentStatus: 'paid',
    };
    const paymentId = 1;
    const payment = new Payment({ ...paymentInput, id: paymentId });

    mockOrderDbGetOrderById.mockReturnValue(order);
    mockPaymentDbGetPayments.mockReturnValue([]);
    mockPaymentDbAddPayment.mockReturnValue(payment);

    const result = paymentService.makePayment(1, paymentInput);

    expect(result).toEqual(payment);
    expect(mockOrderDbGetOrderById).toHaveBeenCalledWith({ id: 1 });
    expect(mockPaymentDbAddPayment).toHaveBeenCalledWith(payment);
});

test('given a non-existent order, when making a payment, then an error is thrown', () => {
    const paymentInput: PaymentInput = {
        amount: 100,
        date: new Date(),
        paymentStatus: 'paid',
    };

    mockOrderDbGetOrderById.mockReturnValue(null);

    expect(() => paymentService.makePayment(1, paymentInput)).toThrow(
        'Order with id 1 does not exist.'
    );
    expect(mockOrderDbGetOrderById).toHaveBeenCalledWith({ id: 1 });
});

test('given an already paid order, when making a payment, then an error is thrown', () => {
    const order = {
        getPayment: jest
            .fn()
            .mockReturnValue({ getPaymentStatus: jest.fn().mockReturnValue('paid') }),
    };
    const paymentInput: PaymentInput = {
        amount: 100,
        date: new Date(),
        paymentStatus: 'paid',
    };

    mockOrderDbGetOrderById.mockReturnValue(order);

    expect(() => paymentService.makePayment(1, paymentInput)).toThrow(
        'Order with id 1 is already paid.'
    );
    expect(mockOrderDbGetOrderById).toHaveBeenCalledWith({ id: 1 });
});

test('given a mismatched payment amount, when making a payment, then an error is thrown', () => {
    const order = {
        getPayment: jest
            .fn()
            .mockReturnValue({ getPaymentStatus: jest.fn().mockReturnValue('unpaid') }),
        getTotalAmount: jest.fn().mockReturnValue(100),
    };
    const paymentInput: PaymentInput = {
        amount: 50,
        date: new Date(),
        paymentStatus: 'paid',
    };

    mockOrderDbGetOrderById.mockReturnValue(order);

    expect(() => paymentService.makePayment(1, paymentInput)).toThrow(
        'Payment amount 50 does not match order total amount 100.'
    );
    expect(mockOrderDbGetOrderById).toHaveBeenCalledWith({ id: 1 });
});

test('given valid payments in DB, when getting all payments, then all payments are returned', () => {
    const payments = [
        new Payment({ amount: 100, date: new Date(), paymentStatus: 'paid', id: 1 }),
        new Payment({ amount: 200, date: new Date(), paymentStatus: 'paid', id: 2 }),
    ];

    mockPaymentDbGetPayments.mockReturnValue(payments);

    const result = paymentService.getPayments();

    expect(result).toEqual(payments);
    expect(mockPaymentDbGetPayments).toHaveBeenCalled();
});

test('given a valid payment id, when getting payment by id, then the payment is returned', () => {
    const payment = new Payment({ amount: 100, date: new Date(), paymentStatus: 'paid', id: 1 });

    mockPaymentDbGetPaymentById.mockReturnValue(payment);

    const result = paymentService.getPaymentById(1);

    expect(result).toEqual(payment);
    expect(mockPaymentDbGetPaymentById).toHaveBeenCalledWith({ id: 1 });
});

test('given a non-existent payment id, when getting payment by id, then an error is thrown', () => {
    mockPaymentDbGetPaymentById.mockReturnValue(null);

    expect(() => paymentService.getPaymentById(1)).toThrow('Payment with id 1 does not exist.');
    expect(mockPaymentDbGetPaymentById).toHaveBeenCalledWith({ id: 1 });
});
