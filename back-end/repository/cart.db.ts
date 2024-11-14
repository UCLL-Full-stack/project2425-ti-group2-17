import { Cart } from '../model/cart';
import { Customer } from '../model/customer';
import { CartItem } from '../model/cartItem';
import { Product } from '../model/product';
import productDb from './product.db';
import customerDb from './customer.db';
import database from './database';

// const customers: Customer[] = customerDb.getCustomers();

// const products: Product[] = productDb.getProducts();

// const carts: Cart[] = [];

// const cartJohn = new Cart({
//     customer: customers[0],
//     products: [
//         new CartItem({ product: products[0], quantity: 2 }),
//         new CartItem({ product: products[1], quantity: 1 }),
//     ],
//     id: 1,
// });
// carts.push(cartJohn);

// const cartJane = new Cart({
//     customer: customers[1],
//     products: [
//         new CartItem({ product: products[0], quantity: 1 }),
//         new CartItem({ product: products[2], quantity: 2 }),
//     ],
//     id: 2,
// });
// carts.push(cartJane);

// const cartAlice = new Cart({
//     customer: customers[2],
//     products: [
//         new CartItem({ product: products[1], quantity: 2 }),
//         new CartItem({ product: products[2], quantity: 1 }),
//     ],
//     id: 3,
// });
// carts.push(cartAlice);

// const cartTempLogin = new Cart({
//     customer: customers[3],
//     products: [],
//     id: 4,
// });
// carts.push(cartTempLogin);

// const getCarts = (): Cart[] => carts;

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

// const addCartItem = (cart: Cart, product: Product, quantity: number): CartItem => {
//     return cart.addItem(product, quantity);
// };

// const removeCartItem = (cart: Cart, product: Product, quantity: number): CartItem | string => {
//     return cart.removeItem(product, quantity);
// };

// const emptyCart = (cart: Cart): string => {
//     cart.emptyCart();
//     return 'cart successfully emptied.';
// };

export default {
    getCarts,
    getCartById,
    createCart,
    getCartByCustomerEmail,
    getCartByCustomerId,
    deleteCart,
    //     addCartItem,
    //     removeCartItem,
    //     emptyCart,
};
