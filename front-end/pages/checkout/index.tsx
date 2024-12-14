import Header from '@components/header';
import { Cart, Customer, StatusMessage } from '@types';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import CartService from '@services/CartService';
import CartOverviewTable from '@components/checkout/CartOverviewTable';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';
import classNames from 'classnames';

const Checkout: React.FC = () => {
    const [orderStatus, setOrderStatus] = useState<string | null>(null);
    const [loggedInUser, setLoggedInUser] = useState<Customer | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const getCartByEmail = async () => {
        if (loggedInUser) {
            const response = await CartService.getCartByEmail(loggedInUser.email!);
            if (response.ok) {
                const cart = await response.json();
                return cart;
            }
        }
    };

    const convertCartToOrder = async (paymentStatus: string) => {
        setStatusMessages([]);
        const response = await CartService.convertCartToOrder(loggedInUser?.email!, paymentStatus);
        if (!response.ok) {
            if (response.status === 401) {
                setStatusMessages([
                    {
                        message: 'You must be logged in to create your order.',
                        type: 'error',
                    },
                ]);
            } else {
                const errorResponse = await response.json();
                setStatusMessages([
                    {
                        message: 'Failed to update product: ' + errorResponse.message,
                        type: 'error',
                    },
                ]);
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
                setStatusMessages([
                    {
                        message: 'You must be logged in to adjust item quantities in your cart.',
                        type: 'error',
                    },
                ]);
            } else {
                const errorResponse = await response.json();
                setStatusMessages([
                    {
                        message: 'Failed to adjust item quantity in cart: ' + errorResponse.message,
                        type: 'error',
                    },
                ]);
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
                {error && <div className="text-red-800">{error}</div>}
                {isLoading && <p className="text-green-800">Loading...</p>}
                <section className="flex w-full justify-center">
                    {statusMessages && (
                        <div className="row">
                            <ul className="list-none mb-3 mx-auto">
                                {statusMessages.map(({ message, type }, index) => (
                                    <li
                                        key={index}
                                        className={classNames({
                                            'text-red-800': type === 'error',
                                            'text-green-800': type === 'success',
                                        })}
                                    >
                                        {message}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
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
