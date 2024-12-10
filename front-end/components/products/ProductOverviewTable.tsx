import React from 'react';
import { Product, Customer } from '@types';
import ProductArticle from './ProductArticle';
import Image from 'next/image';
import CustomerService from '@services/CustomerService';
import CartService from '@services/CartService';
import ProductService from '@services/ProductService';

type Props = {
    products: Array<Product>;
    loggedInUser: Customer;
};

const ProductOverviewTable: React.FC<Props> = ({ products, loggedInUser }) => {
    const updateProduct = async (id: number) => {
        // const existingProduct = products?.find((product) => product.id === id);
        // if (!existingProduct) {
        //     throw new Error('Product not found');
        //     return;
        // }
        // const name = window.prompt('Enter new name:', existingProduct.name) || existingProduct.name;
        // const price =
        //     Number(window.prompt('Enter new price:', existingProduct.price.toString())) ||
        //     existingProduct.price;
        // const stock =
        //     Number(window.prompt('Enter new stock:', existingProduct.stock.toString())) ||
        //     existingProduct.stock;
        // const description =
        //     window.prompt('Enter new description:', existingProduct.description) ||
        //     existingProduct.description;
        // const categories =
        //     window
        //         .prompt('Enter new categories:', existingProduct.categories.join(', '))
        //         ?.split(',')
        //         .map((item) => item.trim()) || existingProduct.categories;
        // const sizes =
        //     window
        //         .prompt('Enter new sizes:', existingProduct.sizes.join(', '))
        //         ?.split(',')
        //         .map((item) => item.trim()) || existingProduct.sizes;
        // const colors =
        //     window
        //         .prompt('Enter new colors:', existingProduct.colors.join(', '))
        //         ?.split(',')
        //         .map((item) => item.trim()) || existingProduct.colors;
        // // const images =
        // //     window
        // //         .prompt(
        // //             'Enter new images:',
        // //             existingProduct.images.join(', ')
        // //         )
        // //         ?.split(',')
        // //         .map((item) => item.trim()) || existingProduct.images;
        // const updatedProduct: ProductInput = {
        //     name,
        //     price,
        //     stock,
        //     categories,
        //     description,
        //     images: existingProduct.images,
        //     sizes,
        //     colors,
        // };
        // try {
        //     // setError(null);
        //     await ProductService.updateProduct(id.toString(), updatedProduct);
        //     getProducts();
        // } catch (err: any) {
        //     throw err.message;
        // }
    };

    const deleteProduct = async (id: number) => {
        const response = await ProductService.deleteProduct(id.toString());
        if (!response.ok) {
            if (response.status === 401) {
                return new Error('You must be an admin to delete a product.');
            } else {
                return new Error(response.statusText);
            }
        }
    };

    const addItemToCart = async (productId: number) => {
        const response = await CartService.addItemToCart(
            loggedInUser?.email!,
            productId.toString(),
            '1'
        );
        if (!response.ok) {
            if (response.status === 401) {
                return new Error('You must be an admin to delete a product.');
            } else {
                return new Error(response.statusText);
            }
        }
    };

    const addToWishlist = async (email: string, productId: number) => {
        const response = await CustomerService.addToWishlist(email, productId.toString());
        if (!response.ok) {
            if (response.status === 401) {
                return new Error('You must be logged in to add a product to your wishlist.');
            } else {
                return new Error(response.statusText);
            }
        }
    };

    const removeFromWishlist = async (email: string, productId: number) => {
        const response = await CustomerService.removeFromWishlist(
            loggedInUser?.email!,
            productId.toString()
        );
        if (!response.ok) {
            if (response.status === 401) {
                return new Error('You must be logged in to add a product to your wishlist.');
            } else {
                return new Error(response.statusText);
            }
        }
    };
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
