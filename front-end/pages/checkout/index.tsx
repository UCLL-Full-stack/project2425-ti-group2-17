import Header from '@components/header';
import { Cart, Customer } from '@types';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import CartService from '@services/CartService';
import CartOverviewTable from '@components/checkout/CartOverviewTable';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const Checkout: React.FC = () => {
    const [orderStatus, setOrderStatus] = useState<string | null>(null);
    const [loggedInUser, setLoggedInUser] = useState<Customer | null>(null);
    const [internalError, setInternalError] = useState<string | null>(null);

    // const getLoggedInUser = async () => {
    //     const storedUser = sessionStorage.getItem('loggedInUser');
    //     if (storedUser) {
    //         setLoggedInUser(JSON.parse(storedUser));
    //     }
    //     console.log('test');
    //     console.log(loggedInUser);
    //     console.log('test2');
    //     console.log(storedUser!);
    //     console.log('test3');
    //     console.log(JSON.parse(storedUser!));
    // };

    const getCartByEmail = async () => {
        // if (!loggedInUser) {
        //     await getLoggedInUser();
        // }
        const response = await CartService.getCartByEmail(loggedInUser?.email!);
        if (!response.ok) {
            if (response.status === 401) {
                return new Error('You must be logged in to view this page.');
            } else {
                return new Error(response.statusText);
            }
        } else {
            const cart = await response.json();
            return cart;
        }
    };

    const convertCartToOrder = async (paymentStatus: string) => {
        const response = await CartService.convertCartToOrder(loggedInUser?.email!, paymentStatus);
        if (!response.ok) {
            if (response.status === 401) {
                return new Error('You must be logged in to create your order.');
            } else {
                return new Error(response.statusText);
            }
        } else {
            setOrderStatus('Your order has been placed and an invoice has been sent.');
            mutate('cart', getCartByEmail());
        }
    };

    const updateQuantity = async (productId: number, quantity: number) => {
        let response;
        if (quantity > 0) {
            response = await CartService.addItemToCart(
                loggedInUser?.email!,
                productId.toString(),
                quantity.toString()
            );
        } else if (quantity < 0) {
            response = await CartService.removeItemFromCart(
                loggedInUser?.email!,
                productId.toString(),
                Math.abs(quantity).toString()
            );
        }
        if (response && !response.ok) {
            if (response.status === 401) {
                return new Error('You must be logged in to add items to your cart.');
            } else {
                return new Error(response.statusText);
            }
        } else {
            mutate('cart', getCartByEmail());
        }
    };

    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')!));
    }, []);

    const { data: cart, isLoading, error } = useSWR('cart', getCartByEmail);

    useInterval(() => {
        mutate('cart', getCartByEmail());
    }, 1000);
    return (
        <>
            <Head>
                <title>Checkout</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Checkout</h1>
                {error && <div className="text-red-800">{error}</div>}
                {isLoading && <p className="text-green-800">Loading...</p>}
                <section className="flex w-full justify-center">
                    {cart && loggedInUser && (
                        <CartOverviewTable
                            cart={cart}
                            convertCartToOrder={convertCartToOrder}
                            updateQuantity={updateQuantity}
                        />
                    )}
                </section>
                {orderStatus && <div>{orderStatus}</div>}
            </main>
        </>
    );
};

export default Checkout;
