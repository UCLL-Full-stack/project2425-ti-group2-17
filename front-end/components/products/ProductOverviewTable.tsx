import React from 'react';
import { Product, Customer } from '@types';
import ProductArticle from './ProductArticle';
import Image from 'next/image';

type Props = {
    products: Array<Product>;
    loggedInUser: Customer;
    updateProduct: (id: number) => void;
    deleteProduct: (id: number) => void;
    addItemToCart: (id: number) => void;
    addToWishlist: (email: string, id: number) => void;
};

const ProductOverviewTable: React.FC<Props> = ({
    products,
    loggedInUser,
    updateProduct,
    deleteProduct,
    addItemToCart,
    addToWishlist,
}) => {
    return (
        <>
            {products && products.length > 0 ? (
                <div className="container mx-auto px-4 flex flex-row flex-wrap">
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
                            <button
                                type="button"
                                onClick={() => updateProduct(product.id!)}
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
                        </ProductArticle>
                    ))}
                </div>
            ) : (
                <p className="text-center mt-8">No products available.</p>
            )}
        </>
    );
};

export default ProductOverviewTable;
