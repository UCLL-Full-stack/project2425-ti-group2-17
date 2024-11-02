import orderService from '../../service/order.service';
import orderDb from '../../repository/order.db';
import { Order } from '../../model/order';
import { Customer } from '../../model/customer';
import { OrderItem } from '../../model/orderItem';
import { Payment } from '../../model/payment';
import { Product } from '../../model/product';

const orders: Order[] = [
    new Order({
        customer: new Customer({
            firstName: 'Alice',
            lastName: 'Johnson',
            email: 'alice.johnson@example.com',
            password: 'securepassword123',
            wishlist: [],
            id: 1,
        }),
        items: [
            new OrderItem({
                product: new Product({
                    id: 1,
                    name: 'Classic T-Shirt',
                    price: 19.99,
                    stock: 200,
                    category: ['Clothing', 'Men'],
                    description: 'Comfortable cotton T-Shirt.',
                    images: ['tshirt_front.jpg', 'tshirt_back.jpg'],
                    sizes: ['S', 'M', 'L', 'XL'],
                    colors: ['Red', 'Blue', 'Black'],
                }),
                quantity: 2,
            }),
        ],
        date: new Date(),
        payment: new Payment({
            amount: 39.98,
            date: new Date(),
            paymentStatus: 'paid',
        }),
    }),
];

let mockOrderDbGetOrders: jest.Mock;
let mockOrderDbGetOrderById: jest.Mock;
let mockOrderDbDeleteOrder: jest.Mock;

beforeEach(() => {
    mockOrderDbGetOrders = jest.fn();
    mockOrderDbGetOrderById = jest.fn();
    mockOrderDbDeleteOrder = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given orders in the DB, when getting all orders, then all orders are returned', () => {
    orderDb.getOrders = mockOrderDbGetOrders.mockReturnValue(orders);

    const result = orderService.getOrders();

    expect(result).toEqual(orders);
    expect(mockOrderDbGetOrders).toHaveBeenCalled();
});

test('given orders in the DB, when getting customer by id, then customer with id is returned', () => {
    orderDb.getOrderById = mockOrderDbGetOrderById.mockReturnValue(orders[0]);

    const result = orderService.getOrderById(1);

    expect(result).toEqual(orders[0]);
    expect(mockOrderDbGetOrderById).toHaveBeenCalledWith({ id: 1 });
});

test('given order exists in the DB, when deleting order by id, then order is deleted', () => {
    orderDb.getOrderById = mockOrderDbGetOrderById.mockReturnValue(orders[0]);
    orderDb.deleteOrder = mockOrderDbDeleteOrder.mockReturnValue('Order deleted successfully');

    const result = orderService.deleteOrder(1);

    expect(result).toBe('Order deleted successfully');
    expect(mockOrderDbGetOrderById).toHaveBeenCalledWith({ id: 1 });
    expect(mockOrderDbDeleteOrder).toHaveBeenCalledWith({ id: 1 });
});

test('given order does not exist in the DB, when deleting order by id, then error is thrown', () => {
    orderDb.getOrderById = mockOrderDbGetOrderById.mockReturnValue(null);

    expect(() => orderService.deleteOrder(1)).toThrow('This order does not exist.');
    expect(mockOrderDbGetOrderById).toHaveBeenCalledWith({ id: 1 });
    expect(mockOrderDbDeleteOrder).not.toHaveBeenCalled();
});
