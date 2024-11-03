import Header from '@components/header';
import { Cart } from '@types';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import CartService from '@services/CartService';
import CartOverviewTable from '@components/checkout/CartOverviewTable';

const Checkout: React.FC = () => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [orderStatus, setOrderStatus] = useState<string | null>(null);

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

    const convertCartToOrder = async (cartId: number, paymentStatus: string) => {
        try {
            await CartService.convertCartToOrder(cartId.toString(), paymentStatus);
            getCartById(4);
            setOrderStatus('Your order has been placed and an invoice has been sent.');
        } catch (err: any) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to get cart by id.');
            }
        }
    };

    const updateQuantity = async (productId: number, quantity: number) => {
        try {
            if (quantity > 0) {
                await CartService.addItemToCart('4', productId.toString(), quantity.toString());
            } else if (quantity < 0) {
                await CartService.removeItemFromCart(
                    '4',
                    productId.toString(),
                    Math.abs(quantity).toString()
                );
            }
            getCartById(4);
        } catch (err: any) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to add product to cart.');
            }
            return 0;
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
