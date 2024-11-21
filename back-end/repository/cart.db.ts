import { Cart } from '../model/cart';
import { Customer } from '../model/customer';
import { CartItem } from '../model/cartItem';
import { Product } from '../model/product';
import database from './database';

const getCarts = async (): Promise<Cart[]> => {
    try {
        const cartsPrisma = await database.cart.findMany({
            include: {
                customer: true,
                cartItems: { include: { product: true } },
            },
        });
        return cartsPrisma.map((cartPrisma) => Cart.from(cartPrisma));
    } catch (error) {
        // throw new Error('Databse Error. See server log for details.');
        throw error;
    }
};

const getCartById = async ({ id }: { id: number }): Promise<Cart | null> => {
    try {
        const cartPrisma = await database.cart.findUnique({
            where: { id: id },
            include: {
                customer: true,
                cartItems: { include: { product: true } },
            },
        });

        if (!cartPrisma) {
            return null;
        }
        return Cart.from(cartPrisma);
    } catch (error) {
        // throw new Error('Database Error. See server log for details.');
        throw error;
    }
};

const getCartByCustomerEmail = async ({ email }: { email: string }): Promise<Cart | null> => {
    try {
        const cartPrisma = await database.cart.findFirst({
            where: {
                customer: {
                    email: email,
                },
            },
            include: {
                customer: true,
                cartItems: { include: { product: true } },
            },
        });

        if (!cartPrisma) {
            return null;
        }
        return Cart.from(cartPrisma);
    } catch (error) {
        // throw new Error('Database Error. See server log for details.');
        throw error;
    }
};

const getCartByCustomerId = async ({ id }: { id: number }): Promise<Cart | null> => {
    try {
        const cartPrisma = await database.cart.findUnique({
            where: { customerId: id },
            include: {
                customer: true,
                cartItems: { include: { product: true } },
            },
        });

        if (!cartPrisma) {
            return null;
        }
        return Cart.from(cartPrisma);
    } catch (error) {
        // throw new Error('Database Error. See server log for details.');
        throw error;
    }
};

const createCart = async (customer: Customer): Promise<Cart> => {
    try {
        const cartPrisma = await database.cart.create({
            data: {
                customer: {
                    connect: { id: customer.getId() },
                },
                cartItems: {
                    create: [],
                },
            },
            include: {
                customer: true,
                cartItems: { include: { product: true } },
            },
        });
        return Cart.from(cartPrisma);
    } catch (error) {
        // throw new Error('Database Error. See server log for details.');
        throw error;
    }
};

const deleteCart = async ({ id }: { id: number }): Promise<string> => {
    try {
        await database.cart.delete({
            where: { id: id },
        });
        return 'Cart successfully deleted.';
    } catch (error) {
        // throw new Error('Database Error. See server log for details.');
        throw error;
    }
};

const addCartItem = async (cart: Cart, product: Product, quantity: number): Promise<CartItem> => {
    try {
        const productSize = cart.getProducts().length;
        const cartItem = cart.addItem(product, quantity);
        const newProductSize = cart.getProducts().length;
        if (productSize !== newProductSize) {
            await database.cart.update({
                where: { id: cart.getId() },
                data: {
                    customer: {
                        connect: { id: cart.getCustomer().getId() },
                    },
                    cartItems: {
                        create: {
                            product: {
                                connect: { id: product.getId() },
                            },
                            quantity: cartItem.getQuantity(),
                        },
                    },
                },
                include: {
                    customer: true,
                    cartItems: { include: { product: true } },
                },
            });
        } else {
            const existingCartItem = await database.cartItem.findFirst({
                where: {
                    cartId: cart.getId(),
                    productId: product.getId(),
                },
            });

            if (!existingCartItem) {
                throw new Error('CartItem not found.');
            }

            await database.cartItem.update({
                where: { id: existingCartItem.id },
                data: {
                    quantity: cartItem.getQuantity(),
                },
            });
        }
        const cartItemPrisma = await database.cartItem.findFirst({
            where: {
                cartId: cart.getId(),
                productId: product.getId(),
            },
            include: { product: true },
        });

        if (!cartItemPrisma) {
            throw new Error('CartItem not found.');
        }
        return CartItem.from(cartItemPrisma);
    } catch (error) {
        // throw new Error('Database Error. See server log for details.');
        throw error;
    }
};

const removeCartItem = async (
    cart: Cart,
    product: Product,
    quantity: number
): Promise<CartItem | string> => {
    try {
        const productSize = cart.getProducts().length;
        const cartItem = cart.removeItem(product, quantity);
        const newProductSize = cart.getProducts().length;
        const existingCartItem = await database.cartItem.findFirst({
            where: {
                cartId: cart.getId(),
                productId: product.getId(),
            },
        });
        if (!existingCartItem) {
            throw new Error('CartItem not found.');
        }
        if (productSize !== newProductSize) {
            await database.cartItem.delete({
                where: { id: existingCartItem.id },
            });
            return 'Item removed from cart.';
        } else if (cartItem instanceof CartItem) {
            await database.cartItem.update({
                where: { id: existingCartItem.id },
                data: {
                    quantity: cartItem.getQuantity(),
                },
            });
            const cartItemPrisma = await database.cartItem.findFirst({
                where: {
                    cartId: cart.getId(),
                    productId: product.getId(),
                },
                include: { product: true },
            });

            if (!cartItemPrisma) {
                throw new Error('CartItem not found.');
            }
            return CartItem.from(cartItemPrisma);
        } else {
            throw new Error('CartItem not found.');
        }
    } catch (error) {
        // throw new Error('Database Error. See server log for details.');
        throw error;
    }
};

const emptyCart = async (cart: Cart): Promise<string> => {
    try {
        await database.cart.update({
            where: { id: cart.getId() },
            data: {
                cartItems: {
                    set: [],
                },
            },
            include: {
                customer: true,
                cartItems: { include: { product: true } },
            },
        });
        return 'cart successfully emptied.';
    } catch (error) {
        // throw new Error('Database Error. See server log for details.');
        throw error;
    }
};

export default {
    getCarts,
    getCartById,
    createCart,
    getCartByCustomerEmail,
    getCartByCustomerId,
    deleteCart,
    addCartItem,
    removeCartItem,
    emptyCart,
};
