import { Cart } from '../model/cart';
import cartDB from '../repository/cart.db';

const getCarts = (): Cart[] => cartDB.getCarts();

const getCartById = (id: number): Cart => {
    const cart = cartDB.getCartById({ id });
    if (!cart) throw new Error(`Cart with id ${id} does not exist.`);
    return cart;
};

export default {
    getCarts,
    getCartById,
};
