import React from 'react';
import Image from 'next/image';
import styles from '@styles/home.module.css';
import { Product } from '@types';

type ProductCardProps = {
    product: Product;
    quantity?: number;
    children: React.ReactNode;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, quantity, children }) => {
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
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <div className="mt-2">
                        <p className="font-bold text-black">Price: ${product.price}</p>
                        <p className="text-gray-600">Stock: {product.stock}</p>
                        {quantity &&
                            (product.stock - quantity <= 0 ? (
                                <p className="text-red-500 font-semibold">Low stock: None left.</p>
                            ) : (
                                product.stock - quantity < 5 && (
                                    <p className="text-red-500 font-semibold">
                                        Low stock: Only {product.stock - quantity} left.
                                    </p>
                                )
                            ))}
                        {quantity && (
                            <p className="text-green-500 font-semibold">
                                Amount in cart: {quantity}
                            </p>
                        )}
                    </div>
                </div>
                <div className="mt-4">
                    <div className="text-left">
                        <strong>Categories:</strong> {product.categories.join(', ')}
                    </div>
                    <div className="text-left">
                        <strong>Sizes:</strong> {product.sizes.join(', ')}
                    </div>
                    <div className="text-left">
                        <strong>Colors:</strong> {product.colors.join(', ')}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center ml-4">{children}</div>
        </article>
    );
};

export default ProductCard;
