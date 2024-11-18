import { Cart } from '../../model/cart';
import { CartItem } from '../../model/cartItem';
import { Customer } from '../../model/customer';
import { Order } from '../../model/order';
import { OrderItem } from '../../model/orderItem';
import { Payment } from '../../model/payment';
import { Product } from '../../model/product';
import cartDb from '../../repository/cart.db';
import orderDb from '../../repository/order.db';
import productDb from '../../repository/product.db';
import cartService from '../../service/cart.service';

const customers: Customer[] = [
    new Customer({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        wishlist: [],
        id: 1,
    }),
    new Customer({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'password456',
        wishlist: [],
        id: 2,
    }),
    new Customer({
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bob.smith@example.com',
        password: 'password789',
        wishlist: [],
        id: 2,
    }),
];
const product1 = new Product({
    name: 'T-Shirt',
    price: 20.0,
    stock: 100,
    categories: ['Clothing'],
    description: 'A comfortable cotton T-shirt',
    images: ['image1.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Blue', 'Green'],
    id: 1,
});

const product2 = new Product({
    name: 'Sneakers',
    price: 50.0,
    stock: 50,
    categories: ['Footwear'],
    description: 'Stylish and comfortable sneakers',
    images: ['image2.jpg'],
    sizes: ['M', 'L'],
    colors: ['Black', 'White'],
    id: 2,
});

const carts: Cart[] = [];

const cartJohn = new Cart({
    customer: customers[0],
    products: [new CartItem({ product: product1, quantity: 2 })],
    id: 1,
});
carts.push(cartJohn);

const cartJane = new Cart({
    customer: customers[1],
    products: [new CartItem({ product: product2, quantity: 1 })],
    id: 2,
});
carts.push(cartJane);

const order1 = new Order({
    customer: customers[0],
    items: [
        new OrderItem({
            product: product1,
            quantity: 2,
        }),
    ],
    date: new Date('2024-11-02T13:05:28.149Z'),
    payment: new Payment({
        amount: 40.0,
        date: new Date('2024-11-02T13:05:28.149Z'),
        paymentStatus: 'paid',
    }),
    id: 1,
});

const order2 = new Order({
    customer: customers[1],
    items: [
        new OrderItem({
            product: product2,
            quantity: 1,
        }),
    ],
    date: new Date(),
    payment: new Payment({
        amount: 50.0,
        date: new Date(),
        paymentStatus: 'paid',
    }),
    id: 2,
});

let mockCartDbGetCarts: jest.Mock;
let mockCartDbGetCartById: jest.Mock;
let mockCartDbGetCartByCustomerEmail: jest.Mock;
let mockCartDbAddCartItem: jest.Mock;
let mockCartDbRemoveCartItem: jest.Mock;
let mockProductDbGetProductById: jest.Mock;
let mockOrderDbCreateOrder: jest.Mock;
let mockCartDbDeleteCart: jest.Mock;
let mockCartDbEmptyCart: jest.Mock;

beforeEach(() => {
    mockCartDbGetCarts = jest.fn();
    mockCartDbGetCartById = jest.fn();
    mockCartDbGetCartByCustomerEmail = jest.fn();
    mockCartDbAddCartItem = jest.fn();
    mockCartDbRemoveCartItem = jest.fn();
    mockProductDbGetProductById = jest.fn();
    mockOrderDbCreateOrder = jest.fn();
    mockCartDbDeleteCart = jest.fn();
    mockCartDbEmptyCart = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given carts in the DB, when getting all carts, then all carts are returned', async () => {
    cartDb.getCarts = mockCartDbGetCarts.mockReturnValue(carts);

    const result = await cartService.getCarts();

    expect(result).toEqual(carts);
    expect(mockCartDbGetCarts).toHaveBeenCalled();
});

test('given carts in the DB, when getting cart by id, then that cart is returned', async () => {
    cartDb.getCartById = mockCartDbGetCartById.mockReturnValue(carts[0]);

    const result = await cartService.getCartById(1);

    expect(result).toEqual(carts[0]);
    expect(mockCartDbGetCartById).toHaveBeenCalledWith({ id: 1 });
});

test('given carts in the DB, when getting a cart by incorrect id, then an error is thrown', async () => {
    cartDb.getCartById = mockCartDbGetCartById.mockReturnValue(null);

    const getCartById = async () => await cartService.getCartById(3);

    await expect(getCartById).rejects.toThrow('Cart with id 3 does not exist.');
    expect(mockCartDbGetCartById).toHaveBeenCalledWith({ id: 3 });
});

test('given carts in the DB, when getting cart by email, then that cart is returned', async () => {
    cartDb.getCartByCustomerEmail = mockCartDbGetCartByCustomerEmail.mockReturnValue(carts[0]);

    const result = await cartService.getCartByEmail('john.doe@example.com');

    expect(result).toEqual(carts[0]);
    expect(mockCartDbGetCartByCustomerEmail).toHaveBeenCalledWith({
        email: 'john.doe@example.com',
    });
});

test('given carts in the DB, when getting a cart by incorrect email, then an error is thrown', async () => {
    cartDb.getCartByCustomerEmail = mockCartDbGetCartByCustomerEmail.mockReturnValue(null);

    const getCartByEmail = async () => await cartService.getCartByEmail('wrong@email.com');

    await expect(getCartByEmail).rejects.toThrow('Cart with email wrong@email.com does not exist.');
    expect(mockCartDbGetCartByCustomerEmail).toHaveBeenCalledWith({ email: 'wrong@email.com' });
});

test('given valid cart and product, when adding an item to cart, then the item is added', async () => {
    cartDb.getCartByCustomerEmail = mockCartDbGetCartByCustomerEmail.mockReturnValue(cartJohn);
    productDb.getProductById = mockProductDbGetProductById.mockReturnValue(product2);
    cartDb.addCartItem = mockCartDbAddCartItem.mockReturnValue(
        new CartItem({ product: product2, quantity: 1 })
    );

    const result = await cartService.addCartItem('john.doe@example.com', 2, 1);

    expect(result).toEqual(new CartItem({ product: product2, quantity: 1 }));
    expect(mockCartDbAddCartItem).toHaveBeenCalledWith(cartJohn, product2, 1);
});

test('given valid cart with existing product, when adding quantity to existing product, then quantity is updated', async () => {
    cartDb.getCartByCustomerEmail = mockCartDbGetCartByCustomerEmail.mockReturnValue(cartJohn);
    productDb.getProductById = mockProductDbGetProductById.mockReturnValue(product1);
    cartDb.addCartItem = mockCartDbAddCartItem.mockReturnValue(
        new CartItem({ product: product1, quantity: 3 })
    );

    const result = await cartService.addCartItem('john.doe@example.com', 1, 1);

    expect(result.getQuantity()).toEqual(3);
    expect(mockCartDbAddCartItem).toHaveBeenCalledWith(cartJohn, product1, 1);
});

test('given non-existent product, when adding item to cart, then an error is thrown', async () => {
    cartDb.getCartByCustomerEmail = mockCartDbGetCartByCustomerEmail.mockReturnValue(cartJohn);
    productDb.getProductById = mockProductDbGetProductById.mockReturnValue(null);

    const addCartItem = async () => await cartService.addCartItem('john.doe@example.com', 3, 1);

    await expect(addCartItem).rejects.toThrow('Product with id 3 does not exist.');
});

test('given product in cart, when decreasing quantity, then quantity is decreased', async () => {
    cartDb.getCartByCustomerEmail = mockCartDbGetCartByCustomerEmail.mockReturnValue(cartJohn);
    productDb.getProductById = mockProductDbGetProductById.mockReturnValue(product1);
    cartDb.removeCartItem = mockCartDbRemoveCartItem.mockReturnValue(
        new CartItem({ product: product1, quantity: 1 })
    );

    const result = await cartService.removeCartItem('john.doe@example.com', 1, 1);

    expect(result).toBeInstanceOf(CartItem);
    expect((result as CartItem).getQuantity()).toEqual(1);

    expect(mockCartDbRemoveCartItem).toHaveBeenCalledWith(cartJohn, product1, 1);
});

test('given product in cart, when removing entire quantity, then item is removed from cart', async () => {
    cartDb.getCartByCustomerEmail = mockCartDbGetCartByCustomerEmail.mockReturnValue(cartJohn);
    productDb.getProductById = mockProductDbGetProductById.mockReturnValue(product1);
    cartDb.removeCartItem = mockCartDbRemoveCartItem.mockReturnValue('Item removed from cart.');

    const result = await cartService.removeCartItem('john.doe@example.com', 1, 2);

    expect(result).toEqual('Item removed from cart.');
    expect(mockCartDbRemoveCartItem).toHaveBeenCalledWith(cartJohn, product1, 2);
});

test('given non-existent product, when removing item from cart, then an error is thrown', async () => {
    cartDb.getCartByCustomerEmail = mockCartDbGetCartByCustomerEmail.mockReturnValue(cartJohn);
    productDb.getProductById = mockProductDbGetProductById.mockReturnValue(null);

    const removeCartItem = async () =>
        await cartService.removeCartItem('john.doe@example.com', 3, 1);

    await expect(removeCartItem).rejects.toThrow('Product with id 3 does not exist.');
});

test('given quantity greater than in cart, when removing item from cart, then an error is thrown', async () => {
    cartDb.getCartByCustomerEmail = mockCartDbGetCartByCustomerEmail.mockReturnValue(cartJohn);
    productDb.getProductById = mockProductDbGetProductById.mockReturnValue(product1);
    cartDb.removeCartItem = mockCartDbRemoveCartItem.mockImplementation(() => {
        throw new Error('There are not that many products in the cart to remove.');
    });

    const removeCartItem = async () =>
        await cartService.removeCartItem('john.doe@example.com', 1, 5);

    await expect(removeCartItem).rejects.toThrow(
        'There are not that many products in the cart to remove.'
    );
});

// test('given valid cart and payment info, when converting cart to order, then order is created', () => {
//     cartDb.getCartById = mockCartDbGetCartById.mockReturnValue(cartJohn);
//     orderDb.createOrder = mockOrderDbCreateOrder.mockReturnValue(order1);
//     cartDb.emptyCart = mockCartDbEmptyCart.mockReturnValue('cart successfully emptied.');

//     const result = cartService.convertCartToOrder(1, 'paid');

//     expect(result.getCustomer()).toEqual(order1.getCustomer());
//     expect(result.getItems()).toEqual(order1.getItems());
//     expect(result.getPayment().getAmount()).toEqual(order1.getPayment().getAmount());
//     expect(result.getPayment().getPaymentStatus()).toEqual(order1.getPayment().getPaymentStatus());
//     expect(mockCartDbGetCartById).toHaveBeenCalledWith({ id: 1 });
//     expect(mockOrderDbCreateOrder).toHaveBeenCalledWith(
//         expect.objectContaining({
//             customer: order1.getCustomer(),
//             items: order1.getItems(),
//             payment: expect.objectContaining({
//                 amount: order1.getPayment().getAmount(),
//                 paymentStatus: order1.getPayment().getPaymentStatus(),
//             }),
//         })
//     );
//     expect(mockCartDbEmptyCart).toHaveBeenCalled();
// });

// test('given non-existent cart, when converting cart to order, then an error is thrown', () => {
//     cartDb.getCartById = mockCartDbGetCartById.mockReturnValue(null);

//     expect(() => cartService.convertCartToOrder(3, 'paid')).toThrow(
//         'Cart with id 3 does not exist.'
//     );
//     expect(mockCartDbGetCartById).toHaveBeenCalledWith({ id: 3 });
// });

// test('given missing payment info, when converting cart to order, then an error is thrown', () => {
//     cartDb.getCartById = mockCartDbGetCartById.mockReturnValue(cartJohn);

//     expect(() => cartService.convertCartToOrder(1, '')).toThrow('Payment status is required.');
//     expect(mockCartDbGetCartById).toHaveBeenCalledWith({ id: 1 });
// });

// test('given invalid payment info, when converting cart to order, then an error is thrown', () => {
//     cartDb.getCartById = mockCartDbGetCartById.mockReturnValue(cartJohn);

//     expect(() => cartService.convertCartToOrder(1, 'invalid')).toThrow(
//         'Payment status must be paid or unpaid.'
//     );
//     expect(mockCartDbGetCartById).toHaveBeenCalledWith({ id: 1 });
// });
