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

const createCart = (customer: Customer): Cart => {
    const existingCart = cartDB.getCartByCustomerEmail({
        email: customer.getEmail(),
    });

    if (existingCart) throw new Error('This customer already has a cart.');

    const cart = new Cart({ customer, products: [] });
    return cartDB.createCart(cart);
};

export default {
    getCarts,
    getCartById,
    createCart,
};
