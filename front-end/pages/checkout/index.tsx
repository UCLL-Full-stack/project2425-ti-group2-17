import Header from '@components/header';
import { Cart } from '@types';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import CartService from '@services/CartService';
import CartOverviewTable from '@components/checkout/CartOverviewTable';

const Checkout: React.FC = () => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getCartById = async (cartId: number) => {
        try {
            const response = await CartService.getCartById(cartId.toString());
            const cart = await response;
            setCart(cart);
        } catch (err: any) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to get cart by id.');
            }
        }
    };

    useEffect(() => {
        getCartById(4);
    }, []);
    return (
        <>
            <Head>
                <title>Checkout</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Checkout</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <section>{cart && <CartOverviewTable cart={cart} />}</section>
            </main>
        </>
    );
};

export default Checkout;
