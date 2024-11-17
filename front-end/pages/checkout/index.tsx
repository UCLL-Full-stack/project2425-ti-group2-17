import Header from '@components/header';
import { Cart } from '@types';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import CartService from '@services/CartService';
import CartOverviewTable from '@components/checkout/CartOverviewTable';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const Checkout: React.FC = () => {
    const [orderStatus, setOrderStatus] = useState<string | null>(null);
    const [loggedInUserId, setLoggedInUserId] = useState<number>();
    const [loggedInUserEmail, setLoggedInUserEmail] = useState<string>();
    const [internalError, setInternalError] = useState<string | null>(null);

    const getCartByEmail = async () => {
        try {
            const response = await CartService.getCartByEmail(loggedInUserEmail!);
            return response;
        } catch (err: any) {
            throw err;
        }
    };

    const convertCartToOrder = async (paymentStatus: string) => {
        try {
            await CartService.convertCartToOrder(loggedInUserEmail!, paymentStatus);
            setOrderStatus('Your order has been placed and an invoice has been sent.');
        } catch (err: any) {
            throw err;
        }
    };

    const updateQuantity = async (productId: number, quantity: number) => {
        try {
            if (quantity > 0) {
                await CartService.addItemToCart(
                    loggedInUserEmail!,
                    productId.toString(),
                    quantity.toString()
                );
            } else if (quantity < 0) {
                await CartService.removeItemFromCart(
                    loggedInUserEmail!,
                    productId.toString(),
                    Math.abs(quantity).toString()
                );
            }
        } catch (err: any) {
            console.log('test');
            console.log(err.message);
            throw err;
        }
    };

    useEffect(() => {
        const userId = sessionStorage.getItem('loggedInUserId');
        const userEmail = sessionStorage.getItem('loggedInUserEmail');
        setLoggedInUserId(parseInt(userId!));
        setLoggedInUserEmail(userEmail!);
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
                {error && <div className="alert alert-danger">{error}</div>}
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
