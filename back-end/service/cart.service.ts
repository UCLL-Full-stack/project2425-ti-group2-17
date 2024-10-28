import { Cart } from '../model/cart';
import { Customer } from '../model/customer';
import cartDB from '../repository/cart.db';
import { CartInput, CustomerInput } from '../types';

const getCarts = (): Cart[] => cartDB.getCarts();

const getCartById = (id: number): Cart => {
    const cart = cartDB.getCartById({ id });
    if (!cart) throw new Error(`Cart with id ${id} does not exist.`);
    return cart;
};

// const createCart = (customer: Customer): Cart => {
//     const existingCart = cartDB.getCartByCustomerEmail({
//         email: customer.getEmail(),
//     });

//     if (existingCart) throw new Error('This customer already has a cart.');
//     return cartDB.createCart(customer);
// };

// const deleteCart = (customerId: number) => {
//     const existingCart = cartDB.getCartByCustomerId({ id: customerId });
//     if (!existingCart) {
//         throw new Error('That customer does not have a cart.');
//     }

//     return cartDB.deleteCart({ id: customerId });
// };

export default {
    getCarts,
    getCartById,
    // createCart,
    // deleteCart,
};
