import React from 'react';
import { Product } from '@types';
import Image from 'next/image';
import styles from '@styles/home.module.css';

type Props = {
    products: Array<Product>;
    createProduct: () => void;
    updateProduct: (id: number) => void;
    deleteProduct: (id: number) => void;
    addItemToCart: (id: number) => void;
};

const ProductOverviewTable: React.FC<Props> = ({
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    addItemToCart,
}: Props) => {
    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <button
                    type="button"
                    onClick={() => createProduct()}
                    className="w-min bg-black text-white py-2 rounded px-1"
                >
                    Create product
                </button>
            </div>
            {products && products.length > 0 ? (
                <div className="container mx-auto mt-8 px-4 flex flex-row flex-wrap">
                    {products.map((product) => {
                        return (
                            <article
                                key={product.id}
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
                                        <h3 className="text-lg font-semibold">{product.name}</h3>
                                        <p className="text-sm text-gray-600">
                                            {product.description}
                                        </p>
                                        <div className="mt-2">
                                            <p className="font-bold text-black">
                                                Price: ${product.price}
                                            </p>
                                            <p className="text-gray-600">Stock: {product.stock}</p>
                                            {product.stock < 5 && (
                                                <p className="text-red-500 font-semibold">
                                                    Low stock: Only {product.stock} left.
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="text-left">
                                            <strong>Categories:</strong>{' '}
                                            {product.categories.join(', ')}
                                            <div className="text-left">
                                                <strong>Sizes:</strong> {product.sizes.join(', ')}
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <strong>Colors:</strong> {product.colors.join(', ')}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center ml-4">
                                    <button
                                        onClick={() => {
                                            addItemToCart(product.id);
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
                                        onClick={() => {}}
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
                                        onClick={() => updateProduct(product.id)}
                                        className="w-min bg-black text-white py-2 rounded px-1"
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => deleteProduct(product.id)}
                                        className="w-min bg-black text-white py-2 rounded px-1"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>
            ) : (
                <p className="text-center mt-8">No products available.</p>
            )}
        </>
    );
};

export default ProductOverviewTable;
