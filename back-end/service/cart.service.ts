import { Cart } from '../model/cart';
// import { Product } from '../model/product';
import { CartItem } from '../model/cartItem';
// import { Customer } from '../model/customer';
import cartDB from '../repository/cart.db';
// import { CartInput, CartItemInput, CustomerInput } from '../types';
import productDb from '../repository/product.db';
// import { Payment } from '../model/payment';
// import { OrderItem } from '../model/orderItem';
// import { Order } from '../model/order';
// import orderDb from '../repository/order.db';

const getCarts = async (): Promise<Cart[]> => await cartDB.getCarts();

const getCartById = async (id: number): Promise<Cart | null> => {
    const cart = await cartDB.getCartById({ id });
    if (!cart) throw new Error(`Cart with id ${id} does not exist.`);
    return cart;
};

const addCartItem = async (
    cartId: number,
    productId: number,
    quantity: number
): Promise<CartItem> => {
    const existingCart = await getCartById(cartId);
    const product = await productDb.getProductById({ id: productId });
    if (!product) throw new Error(`Product with id ${productId} does not exist.`);

    return await cartDB.addCartItem(existingCart!, product, quantity);
};

const removeCartItem = async (
    cartId: number,
    productId: number,
    quantity: number
): Promise<CartItem | string> => {
    const existingCart = await getCartById(cartId);
    const product = await productDb.getProductById({ id: productId });
    if (!product) throw new Error(`Product with id ${productId} does not exist.`);

    return await cartDB.removeCartItem(existingCart!, product, quantity);
};

// const convertCartToOrder = (cartId: number, paymentStatus: string): Order => {
//     const cart = getCartById(cartId);

//     if (!cart) throw new Error(`Cart with id ${cartId} does not exist.`);

//     if (!paymentStatus) {
//         throw new Error('Payment status is required.');
//     }
//     if (paymentStatus !== 'paid' && paymentStatus !== 'unpaid') {
//         throw new Error('Payment status must be paid or unpaid.');
//     }

//     const customer = cart.getCustomer();
//     const items = cart.getProducts().map(
//         (cartItem) =>
//             new OrderItem({
//                 product: cartItem.getProduct(),
//                 quantity: cartItem.getQuantity(),
//             })
//     );

//     const payment = new Payment({
//         amount: items.reduce((total, item) => total + item.getTotalPrice(), 0),
//         date: new Date(),
//         paymentStatus: paymentStatus,
//     });

//     const orderId = orderDb.getOrders().length + 1;

//     const order = new Order({
//         customer,
//         items,
//         date: new Date(),
//         payment,
//         id: orderId,
//     });

//     orderDb.createOrder(order);
//     cartDB.emptyCart(cart);

//     return order;
// };

export default {
    getCarts,
    getCartById,
    addCartItem,
    removeCartItem,
    //     convertCartToOrder,
};
