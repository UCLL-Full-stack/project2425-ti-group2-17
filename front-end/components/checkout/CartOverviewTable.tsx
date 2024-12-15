import React from 'react';
import { Cart } from '@types';
import ProductArticle from '@components/products/ProductArticle';

type Props = {
    cart: Cart;
    convertCartToOrder: (paymentStatus: string) => void;
    updateQuantity: (id: number, quantity: number) => void;
    openAddDiscountCode: () => void;
};

const CartOverviewTable: React.FC<Props> = ({
    cart,
    convertCartToOrder,
    updateQuantity,
    openAddDiscountCode,
}) => {
    return (
        <>
            {cart && cart.products.length > 0 ? (
                <div className="container mx-auto mt-8 px-4 flex flex-row flex-wrap">
                    {cart.products
                        .sort((cartItem1, cartItem2) =>
                            cartItem1.product.name.localeCompare(cartItem2.product.name)
                        )
                        .map((cartItem) => (
                            <ProductArticle
                                key={cartItem.product.id}
                                product={cartItem.product}
                                quantity={cartItem.quantity}
                                updateQuantity={updateQuantity}
                            />
                        ))}
                    <div className="container mx-auto mt-8 px-4 flex flex-row flex-wrap">
                        <article
                            key="overview"
                            className="flex flex-row bg-gray-50 border border-gray-300 rounded-lg overflow-hidden m-4 p-4 shadow-md w-full"
                        >
                            <h2>Overview</h2>
                            <p className="text-left mt-8">
                                Total price without discounts: $
                                {Math.round(
                                    cart.products.reduce(
                                        (total, item) => total + item.product.price * item.quantity,
                                        0
                                    ) * 100
                                ) / 100}
                            </p>
                            <p className="text-left mt-8">
                                Total price with discounts: $
                                {Math.round(cart.totalAmount * 100) / 100}
                            </p>
                            <button
                                type="button"
                                onClick={() => openAddDiscountCode()}
                                className="w-min bg-black text-white py-2 rounded px-1"
                            >
                                Add discount code
                            </button>
                            <button
                                type="button"
                                onClick={() => convertCartToOrder('paid')}
                                className="w-min bg-black text-white py-2 rounded px-1"
                            >
                                Order
                            </button>
                        </article>
                    </div>
                </div>
            ) : (
                <p className="text-center mt-8">No products in cart.</p>
            )}
        </>
    );
};

export default CartOverviewTable;
