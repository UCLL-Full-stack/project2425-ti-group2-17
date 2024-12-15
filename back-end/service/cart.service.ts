import { Cart } from '../model/cart';
import { CartItem } from '../model/cartItem';
import cartDB from '../repository/cart.db';
import productDb from '../repository/product.db';
import { Payment } from '../model/payment';
import { OrderItem } from '../model/orderItem';
import { Order } from '../model/order';
import orderDb from '../repository/order.db';
import { DiscountCodeInput } from '../types';
import discountCodeDb from '../repository/discountCode.db';

const getCarts = async (): Promise<Cart[]> => await cartDB.getCarts();

const getCartById = async (id: number): Promise<Cart | null> => {
    const cart = await cartDB.getCartById({ id });
    if (!cart) throw new Error(`Cart with id ${id} does not exist.`);
    return cart;
};

const getCartByEmail = async (email: string): Promise<Cart | null> => {
    const cart = await cartDB.getCartByCustomerEmail({ email });
    if (!cart) throw new Error(`Cart with email ${email} does not exist.`);
    return cart;
};

const addCartItem = async (
    email: string,
    productId: number,
    quantity: number
): Promise<CartItem> => {
    const existingCart = await getCartByEmail(email);
    const product = await productDb.getProductById({ id: productId });
    if (!product) throw new Error(`Product with id ${productId} does not exist.`);

    return await cartDB.addCartItem(existingCart!, product, quantity);
};

const removeCartItem = async (
    email: string,
    productId: number,
    quantity: number
): Promise<CartItem | string> => {
    const existingCart = await getCartByEmail(email);
    const product = await productDb.getProductById({ id: productId });
    if (!product) throw new Error(`Product with id ${productId} does not exist.`);

    return await cartDB.removeCartItem(existingCart!, product, quantity);
};

const convertCartToOrder = async (
    email: string,
    paymentStatus: string,
    discountCodeInputs?: DiscountCodeInput[]
): Promise<Order> => {
    const cart = await getCartByEmail(email);

    if (!cart) throw new Error(`Cart with user email ${email} does not exist.`);

    if (!paymentStatus) {
        throw new Error('Payment status is required.');
    }

    if (paymentStatus !== 'paid' && paymentStatus !== 'unpaid') {
        throw new Error('Payment status must be paid or unpaid.');
    }

    if (discountCodeInputs && discountCodeInputs.length > 0) {
        discountCodeInputs.forEach(async (discountCodeInput) => {
            const discountCode = await discountCodeDb.getDiscountCodeByCode({
                code: discountCodeInput.code,
            });
            if (!discountCode) {
                throw new Error('Invalid discount code.');
            }
            cart.applyDiscountCode(discountCode);
        });
    }

    const customer = cart.getCustomer();
    const items = cart.getProducts().map(
        (cartItem) =>
            new OrderItem({
                product: cartItem.getProduct(),
                quantity: cartItem.getQuantity(),
            })
    );

    const payment = new Payment({
        amount: cart.getTotalAmount(),
        date: new Date(),
        paymentStatus: paymentStatus,
    });

    const order = new Order({
        customer,
        items,
        date: new Date(),
        payment,
    });

    const outputOrder = await orderDb.createOrder(order);
    await cartDB.emptyCart(cart);

    return outputOrder;
};

export default {
    getCarts,
    getCartById,
    addCartItem,
    removeCartItem,
    convertCartToOrder,
    getCartByEmail,
};
