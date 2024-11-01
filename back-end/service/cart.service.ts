import { Cart } from '../model/cart';
import { Product } from '../model/product';
import { CartItem } from '../model/cartItem';
import { Customer } from '../model/customer';
import cartDB from '../repository/cart.db';
import { CartInput, CartItemInput, CustomerInput } from '../types';
import productDb from '../repository/product.db';

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

export default {
    getCarts,
    getCartById,
    addCartItem,
    removeCartItem,
};
