import React, { useState } from 'react';
import { Product, Customer, StatusMessage } from '@types';
import ProductArticle from './ProductArticle';
import Image from 'next/image';
import CustomerService from '@services/CustomerService';
import CartService from '@services/CartService';
import ProductService from '@services/ProductService';
import ProductCreator from './ProductCreator';
import classNames from 'classnames';

type Props = {
    products: Array<Product>;
    loggedInUser: Customer;
    updateProduct?: (product: Product) => void;
    reloadProducts: () => void;
};

const ProductOverviewTable: React.FC<Props> = ({
    products,
    loggedInUser,
    updateProduct,
    reloadProducts,
}) => {
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const deleteProduct = async (id: number) => {
        setStatusMessages([]);
        const response = await ProductService.deleteProduct(id.toString());
        if (!response.ok) {
            if (response.status === 401) {
                setStatusMessages([
                    {
                        message: 'You must be an admin to delete a product.',
                        type: 'error',
                    },
                ]);
            } else {
                const error = await response.json();
                setStatusMessages([
                    {
                        message: 'Failed to update product: ' + error.message,
                        type: 'error',
                    },
                ]);
            }
        }
        reloadProducts();
    };

    const addItemToCart = async (productId: number) => {
        setStatusMessages([]);

        const response = await CartService.addItemToCart(
            loggedInUser?.email!,
            productId.toString(),
            '1'
        );
        if (!response.ok) {
            if (response.status === 401) {
                setStatusMessages([
                    {
                        message: 'You must be logged in as a customer to add an item to your cart.',
                        type: 'error',
                    },
                ]);
            } else {
                const error = await response.json();
                setStatusMessages([
                    {
                        message: 'Failed to add product to cart: ' + error.message,
                        type: 'error',
                    },
                ]);
            }
        }
    };

    const addToWishlist = async (email: string, productId: number) => {
        setStatusMessages([]);

        const response = await CustomerService.addToWishlist(email, productId.toString());
        if (!response.ok) {
            if (response.status === 401) {
                setStatusMessages([
                    {
                        message: 'You must be logged in to add a product to your wishlist.',
                        type: 'error',
                    },
                ]);
            } else {
                const error = await response.json();
                setStatusMessages([
                    {
                        message: 'Failed to add product to wishlist: ' + error.message,
                        type: 'error',
                    },
                ]);
            }
        }
    };

    const removeFromWishlist = async (email: string, productId: number) => {
        setStatusMessages([]);

        const response = await CustomerService.removeFromWishlist(
            loggedInUser?.email!,
            productId.toString()
        );
        if (!response.ok) {
            if (response.status === 401) {
                setStatusMessages([
                    {
                        message: 'You must be logged in to remove a product from your wishlist.',
                        type: 'error',
                    },
                ]);
            } else {
                const error = await response.json();
                setStatusMessages([
                    {
                        message: 'Failed to remove product from wishlist: ' + error.message,
                        type: 'error',
                    },
                ]);
            }
        }
    };
    return (
        <>
            {products && products.length > 0 ? (
                <div className="container mx-auto px-4 flex flex-row flex-wrap">
                    <div>
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
                        {products.map((product) => (
                            <ProductArticle key={product.id} product={product}>
                                <button
                                    onClick={() => {
                                        addItemToCart(product.id!);
                                    }}
                                    className="flex items-center bg-white border rounded p-2 mt-2 transition duration-200 hover:bg-gray-200"
                                >
                                    <Image
                                        src="/images/shopping-cart.png"
                                        alt="Add to Cart"
                                        width={30}
                                        height={30}
                                        className="mr-2"
                                    />
                                </button>
                                <button
                                    onClick={() => {
                                        addToWishlist(loggedInUser.email!, product.id!);
                                    }}
                                    className="flex items-center bg-white border rounded p-2 mt-2 transition duration-200 hover:bg-gray-200"
                                >
                                    <Image
                                        src="/images/wishlist.png"
                                        alt="Toggle Wishlist"
                                        width={30}
                                        height={30}
                                        className="mr-2"
                                    />
                                </button>
                                {updateProduct && (
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => updateProduct(product)}
                                            className="w-min bg-black text-white py-2 rounded px-1"
                                        >
                                            Update
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteProduct(product.id!)}
                                            className="w-min bg-black text-white py-2 rounded px-1"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </ProductArticle>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-center mt-8">No products available.</p>
            )}
        </>
    );
};

export default ProductOverviewTable;
