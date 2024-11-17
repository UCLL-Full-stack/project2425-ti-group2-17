import Header from '@components/header';
import { Product, ProductInput } from '@types';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import ProductService from '@services/ProductService';
import ProductOverviewTable from '@components/products/ProductOverviewTable';
import CartService from '@services/CartService';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const Products: React.FC = () => {
    const getProducts = async (): Promise<Product[]> => {
        try {
            const response = await ProductService.getAllProducts();
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const productData = await response.json();
            if (productData.length === 0) {
                throw new Error('No products found');
            }
            return productData;
        } catch (err: any) {
            throw err;
        }
    };

    const createProduct = async () => {
        const name = window.prompt('Enter new name:');
        const price = Number(window.prompt('Enter new price:'));
        const stock = Number(window.prompt('Enter new stock:'));
        const description = window.prompt('Enter new description:');
        const category = window
            .prompt('Enter new categories with commas and a space in between:')
            ?.split(',')
            .map((item) => item.trim());
        const sizes = window
            .prompt('Enter new sizes with commas and a space in between:')
            ?.split(',')
            .map((item) => item.trim());
        const colors = window
            .prompt('Enter new colors with commas and a space in between:')
            ?.split(',')
            .map((item) => item.trim());
        // const images =
        //     window
        //         .prompt(
        //             'Enter new images:',
        //             existingProduct.images.join(', ')
        //         )
        //         ?.split(',')
        //         .map((item) => item.trim()) || existingProduct.images;

        if (!name || !description || !price || !stock || !category || !sizes || !colors) {
            throw new Error('All fields are required and must be valid.');
        }

        const newProduct: ProductInput = {
            name,
            price,
            stock,
            category,
            description,
            images: ['temp'],
            sizes,
            colors,
        };

        try {
            // setError(null);
            await ProductService.createProduct(newProduct);
            getProducts();
        } catch (err: any) {
            throw new err();
        }
    };

    const updateProduct = async (id: number) => {
        const existingProduct = products?.find((product) => product.id === id);

        if (!existingProduct) {
            throw new Error('Product not found');
            return;
        }

        const name = window.prompt('Enter new name:', existingProduct.name) || existingProduct.name;
        const price =
            Number(window.prompt('Enter new price:', existingProduct.price.toString())) ||
            existingProduct.price;
        const stock =
            Number(window.prompt('Enter new stock:', existingProduct.stock.toString())) ||
            existingProduct.stock;
        const description =
            window.prompt('Enter new description:', existingProduct.description) ||
            existingProduct.description;
        const category =
            window
                .prompt('Enter new categories:', existingProduct.category.join(', '))
                ?.split(',')
                .map((item) => item.trim()) || existingProduct.category;
        const sizes =
            window
                .prompt('Enter new sizes:', existingProduct.sizes.join(', '))
                ?.split(',')
                .map((item) => item.trim()) || existingProduct.sizes;
        const colors =
            window
                .prompt('Enter new colors:', existingProduct.colors.join(', '))
                ?.split(',')
                .map((item) => item.trim()) || existingProduct.colors;
        // const images =
        //     window
        //         .prompt(
        //             'Enter new images:',
        //             existingProduct.images.join(', ')
        //         )
        //         ?.split(',')
        //         .map((item) => item.trim()) || existingProduct.images;

        const updatedProduct: ProductInput = {
            name,
            price,
            stock,
            category,
            description,
            images: existingProduct.images,
            sizes,
            colors,
        };

        try {
            // setError(null);
            await ProductService.updateProduct(id.toString(), updatedProduct);
            getProducts();
        } catch (err: any) {
            throw err.message;
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            // setError(null);
            const response = await ProductService.deleteProduct(id.toString());
            getProducts();
        } catch (err: any) {
            throw err.message;
        }
    };

    const addItemToCart = async (productId: number) => {
        try {
            const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail');
            if (loggedInUserEmail == null) {
                throw new Error('You must be logged in to add an item to your cart.');
            }
            await CartService.addItemToCart(loggedInUserEmail, productId.toString(), '1');
        } catch (err: any) {
            throw err.message;
        }
    };

    const { data: products, isLoading, error } = useSWR('products', getProducts);

    useInterval(() => {
        mutate('products', getProducts());
    }, 1000);
    return (
        <>
            <Head>
                <title>Products</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Products</h1>
                {error && <div className="text-red-800">{error}</div>}
                {isLoading && <p className="text-green-800">Loading...</p>}
                <section>
                    {products && (
                        <ProductOverviewTable
                            products={products}
                            createProduct={createProduct}
                            updateProduct={updateProduct}
                            deleteProduct={deleteProduct}
                            addItemToCart={addItemToCart}
                        />
                    )}
                </section>
            </main>
        </>
    );
};

export default Products;
