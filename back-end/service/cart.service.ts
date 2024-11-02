import { Cart } from '../model/cart';
import { Product } from '../model/product';
import { CartItem } from '../model/cartItem';
import { Customer } from '../model/customer';
import cartDB from '../repository/cart.db';
import { CartInput, CartItemInput, CustomerInput } from '../types';
import productDb from '../repository/product.db';
import { Payment } from '../model/payment';
import { OrderItem } from '../model/orderItem';
import { Order } from '../model/order';
import orderDb from '../repository/order.db';

const getCarts = (): Cart[] => cartDB.getCarts();

const getCartById = (id: number): Cart => {
    const cart = cartDB.getCartById({ id });
    if (!cart) throw new Error(`Cart with id ${id} does not exist.`);
    return cart;
};

const addCartItem = (cartId: number, productId: number, quantity: number): CartItem => {
    const existingCart = getCartById(cartId);
    const product = productDb.getProductById({ id: productId });
    if (!product) throw new Error(`Product with id ${productId} does not exist.`);

    return cartDB.addCartItem(existingCart, product, quantity);
};

const removeCartItem = (cartId: number, productId: number, quantity: number): CartItem | string => {
    const existingCart = getCartById(cartId);
    const product = productDb.getProductById({ id: productId });
    if (!product) throw new Error(`Product with id ${productId} does not exist.`);

    return cartDB.removeCartItem(existingCart, product, quantity);
};

const convertCartToOrder = (cartId: number, paymentInfo: any): Order => {
    const cart = getCartById(cartId);

    if (!cart) throw new Error(`Cart with id ${cartId} does not exist.`);

    const customer = cart.getCustomer();
    const items = cart.getProducts().map(
        (cartItem) =>
            new OrderItem({
                product: cartItem.getProduct(),
                quantity: cartItem.getQuantity(),
            })
    );

    if (!paymentInfo || !paymentInfo.status) {
        throw new Error('Payment status is required.');
    }

    const payment = new Payment({
        amount: items.reduce((total, item) => total + item.getTotalPrice(), 0),
        date: new Date(),
        paymentStatus: paymentInfo.status,
    });

    const orderId = orderDb.getOrders().length + 1;

    const order = new Order({
        customer,
        items,
        date: new Date(),
        payment,
        id: orderId,
    });

    orderDb.createOrder(order);
    cartDB.deleteCart({ id: cartId });

    return order;
};

export default {
    getCarts,
    getCartById,
    addCartItem,
    removeCartItem,
    convertCartToOrder,
};
