import React from 'react';
import { Cart } from '@types';
import Image from 'next/image';
import styles from '@styles/home.module.css';

type Props = {
    cart: Cart;
    convertCartToOrder: (id: number, paymentStatus: string) => void;
};

const CartOverviewTable: React.FC<Props> = ({ cart, convertCartToOrder }) => {
    return (
        <>
            {cart && cart.products.length > 0 ? (
                <div className="container mx-auto mt-8 px-4 flex flex-row flex-wrap">
                    {cart.products.map((cartItem) => (
                        <article
                            key={cartItem.id}
                            className="flex flex-row bg-gray-50 border border-gray-300 rounded-lg overflow-hidden m-4 p-4 shadow-md w-full"
                        >
                            <Image
                                src="/images/default-product-image.png"
                                alt="Product image"
                                className={styles.vercelLogo}
                                width={100}
                                height={100}
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="flex flex-col justify-between ml-4 w-full">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {cartItem.product.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {cartItem.product.description}
                                    </p>
                                    <div className="mt-2">
                                        <p className="font-bold text-black">
                                            Price: ${cartItem.product.price}
                                        </p>
                                        <p className="font-bold text-2xl text-green-700">
                                            Amount in cart: {cartItem.quantity}
                                        </p>
                                        {cartItem.product.stock < 5 && (
                                            <p className="text-red-500 font-semibold">
                                                Low stock: Only {cartItem.product.stock} left.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="text-left">
                                        <strong>Categories:</strong>{' '}
                                        {cartItem.product.category.join(', ')}
                                    </div>
                                    <div className="text-left">
                                        <strong>Sizes:</strong> {cartItem.product.sizes.join(', ')}
                                    </div>
                                    <div className="text-left">
                                        <strong>Colors:</strong>{' '}
                                        {cartItem.product.colors.join(', ')}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <p className="text-center mt-8">No products in cart.</p>
            )}
            {cart && cart.products.length > 0 ? (
                <div className="container mx-auto mt-8 px-4 flex flex-row flex-wrap">
                    <article className="flex flex-row bg-gray-50 border border-gray-300 rounded-lg overflow-hidden m-4 p-4 shadow-md w-full">
                        <h2>Overview</h2>
                        <p className="text-left mt-8">
                            Total price: ${Math.round(cart.totalAmount * 100) / 100}
                        </p>
                        <button
                            type="button"
                            onClick={() => convertCartToOrder(4, 'paid')}
                            className="w-min bg-black text-white py-2 rounded px-1"
                        >
                            Order
                        </button>
                    </article>
                </div>
            ) : (
                <p className="text-center mt-8"></p>
            )}
        </>
    );
};

export default CartOverviewTable;
