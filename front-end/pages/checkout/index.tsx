import Header from '@components/header';
import { Cart } from '@types';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import CartService from '@services/CartService';
import CartOverviewTable from '@components/checkout/CartOverviewTable';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const Checkout: React.FC = () => {
    // const [cart, setCart] = useState<Cart | null>(null);
    // const [error, setError] = useState<string | null>(null);
    const [orderStatus, setOrderStatus] = useState<string | null>(null);

    // const getCartById = async (cartId: number) => {
    //     try {
    //         const response = await CartService.getCartById(cartId.toString());
    //         const cart = await response;
    //         setCart(cart);
    //     } catch (err: any) {
    //         if (err instanceof Error) {
    //             setError(err.message);
    //         } else {
    //             setError('Failed to get cart by id.');
    //         }
    //     }
    // };

    const getCartByEmail = async () => {
        try {
            const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail');
            console.log(loggedInUserEmail);
            if (loggedInUserEmail === null) {
                throw new Error('You must be logged in to add an item to your cart.');
            }
            const response = await CartService.getCartByEmail(loggedInUserEmail);
            return response;
            // return await response.json();
            // const cart = await response;
            // setCart(response);
        } catch (err: any) {
            throw err;
        }
    };

    const convertCartToOrder = async (paymentStatus: string) => {
        try {
            const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail');
            if (loggedInUserEmail == null) {
                throw new Error('You must be logged in to add an item to your cart.');
            }
            await CartService.convertCartToOrder(loggedInUserEmail, paymentStatus);
            // getCartById(loggedInUserEmail);
            // getCartByEmail();
            setOrderStatus('Your order has been placed and an invoice has been sent.');
        } catch (err: any) {
            throw err;
        }
    };

    const updateQuantity = async (productId: number, quantity: number) => {
        try {
            const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail');
            if (loggedInUserEmail == null) {
                throw new Error('You must be logged in to add an item to your cart.');
            }
            if (quantity > 0) {
                await CartService.addItemToCart(
                    loggedInUserEmail,
                    productId.toString(),
                    quantity.toString()
                );
            } else if (quantity < 0) {
                await CartService.removeItemFromCart(
                    loggedInUserEmail,
                    productId.toString(),
                    Math.abs(quantity).toString()
                );
            }
            // getCartById(4);
        } catch (err: any) {
            throw err;
        }
    };

    const { data: cart, isLoading, error } = useSWR('cart', getCartByEmail);

    useInterval(() => {
        mutate('cart', getCartByEmail());
    }, 2000);
    return (
        <>
            <Head>
                <title>Checkout</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Checkout</h1>
                {/* {error && <div className="alert alert-danger">{error}</div>} */}
                {error && (
                    <div className="alert alert-danger">
                        {error instanceof Error ? error.message : 'An unknown error occurred'}
                    </div>
                )}
                <section className="flex w-full justify-center">
                    {cart && (
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
