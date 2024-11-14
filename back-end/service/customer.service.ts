import { Customer } from '../model/customer';
import { Order } from '../model/order';
import { Product } from '../model/product';
import { User } from '../model/user';
import cartDb from '../repository/cart.db';
// import cartDb from '../repository/cart.db';
import customerDB from '../repository/customer.db';
import productDb from '../repository/product.db';
import { CustomerInput } from '../types';
// import cartService from './cart.service';

const getCustomers = async (): Promise<Customer[]> => await customerDB.getCustomers();

const getCustomerById = async (id: number): Promise<Customer | null> => {
    const customer = await customerDB.getCustomerById({ id });

    if (!customer) throw new Error(`Customer with id ${id} does not exist.`);

    return customer;
};

const createCustomer = async ({
    firstName,
    lastName,
    email,
    password,
}: CustomerInput): Promise<Customer> => {
    const existingCustomer = await customerDB.getCustomerByEmail({ email });

    if (existingCustomer) throw new Error('A customer with this email already exists.');

    const customer = new Customer({
        firstName,
        lastName,
        email,
        password,
        wishlist: [],
    });

    const existingCart = await cartDb.getCartByCustomerEmail({
        email: customer.getEmail(),
    });

    if (existingCart) throw new Error('This customer already has a cart.');

    const newCustomer = await customerDB.createCustomer(customer);

    await cartDb.createCart(newCustomer);

    return newCustomer;
};

const updateCustomer = async (
    id: number,
    { firstName, lastName, email, password }: CustomerInput
): Promise<Customer> => {
    const existingCustomer = await customerDB.getCustomerById({ id });
    if (!existingCustomer) throw new Error('This customer does not exist.');

    const newUserData = { firstName, lastName, email, password };

    existingCustomer.updateUser(newUserData);

    return await customerDB.updateCustomer(existingCustomer);
};

const deleteCustomer = async (customerId: number): Promise<string> => {
    const existingCustomer = await customerDB.getCustomerById({ id: customerId });

    if (!existingCustomer) throw new Error('This customer does not exist.');

    const existingCart = await cartDb.getCartByCustomerId({ id: customerId });

    if (!existingCart) {
        throw new Error('That customer does not have a cart.');
    }

    await cartDb.deleteCart({ id: existingCart.getId()! });

    return await customerDB.deleteCustomer({ id: customerId });
};

const addProductToWishlist = async (customerId: number, productId: number): Promise<Product> => {
    const customer = await getCustomerById(customerId);
    const product = await productDb.getProductById({ id: productId });
    if (!product) throw new Error(`Product with id ${productId} does not exist.`);

    if (customer!.getWishlist().some((item) => item.getId() === productId)) {
        throw new Error(`Product with id ${productId} is already in the wishlist.`);
    }
    return await customerDB.addProductToWishlist(customer!, product);
};

const removeProductFromWishlist = async (
    customerId: number,
    productId: number
): Promise<string> => {
    const customer = await getCustomerById(customerId);
    const product = await productDb.getProductById({ id: productId });
    if (!product) throw new Error(`Product with id ${productId} does not exist.`);
    if (!customer!.getWishlist().some((item) => item.getId() === productId)) {
        throw new Error(`Product with id ${productId} is not in the wishlist.`);
    }
    return await customerDB.removeProductFromWishlist(customer!, product);
};

export default {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    addProductToWishlist,
    removeProductFromWishlist,
};
