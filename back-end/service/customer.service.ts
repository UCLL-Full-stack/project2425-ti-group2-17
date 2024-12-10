import { Customer } from '../model/customer';
import { Order } from '../model/order';
import { Product } from '../model/product';
import { User } from '../model/user';
import cartDb from '../repository/cart.db';
// import cartDb from '../repository/cart.db';
import customerDB from '../repository/customer.db';
import productDb from '../repository/product.db';
import { AuthenticationResponse, CustomerInput } from '../types';
// import cartService from './cart.service';
// import bcrypt from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';

const getCustomers = async (): Promise<Customer[]> => await customerDB.getCustomers();

const getCustomerByEmail = async (email: string): Promise<Customer | null> => {
    const customer = await customerDB.getCustomerByEmail({ email });

    if (!customer) throw new Error(`Customer with email ${email} does not exist.`);

    return customer;
};

const getWishlistByEmail = async (email: string): Promise<Product[] | null> => {
    const customer = await getCustomerByEmail(email);
    return customer!.getWishlist();
};

const createCustomer = async ({
    firstName,
    lastName,
    email,
    password,
}: CustomerInput): Promise<Customer> => {
    const existingCustomer = await customerDB.getCustomerByEmail({ email });

    if (existingCustomer) throw new Error('A customer with this email already exists.');

    const hashedPassword = await bcrypt.hash(password, 12);

    const customer = new Customer({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: 'customer',
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
    currentEmail: string,
    { firstName, lastName, email, password }: CustomerInput
): Promise<Customer> => {
    const existingCustomer = await customerDB.getCustomerByEmail({ email: currentEmail });
    if (!existingCustomer) throw new Error('This customer does not exist.');

    const newUserData = { firstName, lastName, email, password, role: existingCustomer.getRole() };

    existingCustomer.updateUser(newUserData);

    return await customerDB.updateCustomer(existingCustomer);
};

const deleteCustomer = async (email: string): Promise<string> => {
    const existingCustomer = await customerDB.getCustomerByEmail({ email });

    if (!existingCustomer) throw new Error('This customer does not exist.');

    const existingCart = await cartDb.getCartByCustomerEmail({ email });

    if (!existingCart) {
        throw new Error('That customer does not have a cart.');
    }

    await cartDb.deleteCart({ id: existingCart.getId()! });

    return await customerDB.deleteCustomer({ email });
};

const addProductToWishlist = async (email: string, productId: number): Promise<Product> => {
    const customer = await getCustomerByEmail(email);
    const product = await productDb.getProductById({ id: productId });
    if (!product) throw new Error(`Product with id ${productId} does not exist.`);

    if (customer!.getWishlist().some((item) => item.getId() === productId)) {
        throw new Error(`Product with id ${productId} is already in the wishlist.`);
    }
    return await customerDB.addProductToWishlist(customer!, product);
};

const removeProductFromWishlist = async (email: string, productId: number): Promise<string> => {
    const customer = await getCustomerByEmail(email);
    const product = await productDb.getProductById({ id: productId });
    if (!product) throw new Error(`Product with id ${productId} does not exist.`);
    if (!customer!.getWishlist().some((item) => item.getId() === productId)) {
        throw new Error(`Product with id ${productId} is not in the wishlist.`);
    }
    return await customerDB.removeProductFromWishlist(customer!, product);
};

// const loginCustomer = async (email: string, password: string): Promise<Customer | null> => {
//     const customer = await customerDB.getCustomerByEmail({ email });

//     if (!customer) throw new Error(`Customer with email ${email} does not exist.`);
//     if (customer.getPassword() !== password) throw new Error('Wrong password');

//     return customer;
// };

const authenticate = async ({
    email,
    password,
}: CustomerInput): Promise<AuthenticationResponse> => {
    const customer = await customerDB.getCustomerByEmail({ email });

    if (!customer) {
        throw new Error('That email and password combination is incorrect.');
    }

    const isValidPassword = await bcrypt.compare(password, customer.getPassword());

    if (!isValidPassword) {
        throw new Error('That email and password combination is incorrect.');
    }

    return {
        token: generateJwtToken({ email, role: customer!.getRole() }),
        email: email,
        fullname: `${customer!.getFirstName()} ${customer!.getLastName()}`,
        role: customer!.getRole(),
    };
};

export default {
    getCustomers,
    getCustomerByEmail,
    getWishlistByEmail,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    addProductToWishlist,
    removeProductFromWishlist,
    authenticate,
};
