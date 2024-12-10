import Header from '@components/header';
import { Customer, Product } from '@types';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import ProductService from '@services/ProductService';
import ProductOverviewTable from '@components/products/ProductOverviewTable';
import CartService from '@services/CartService';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';
import ProductCreator from '@components/products/ProductCreator';
import CustomerService from '@services/CustomerService';
import ProductArticle from '@components/products/ProductArticle';

const Products: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<Customer | null>(null);

    const getProducts = async () => {
        if (loggedInUser) {
            const response = await CustomerService.getWishlist(loggedInUser.email!);
            if (!response.ok) {
                if (response.status === 401) {
                    return new Error('You must be logged in to view this page.');
                } else {
                    return new Error(response.statusText);
                }
            } else {
                const products = await response.json();
                console.log(products);
                return products;
            }
        }
    };

    const { data, isLoading, error } = useSWR('products', getProducts);

    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')!));
    }, []);

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
                {error && <div className="text-red-800">{error}</div>}
                {isLoading && <p className="text-green-800">Loading...</p>}
                <div className="w-4/5 p-4">
                    {data && loggedInUser && (
                        <ProductOverviewTable products={data} loggedInUser={loggedInUser} />
                    )}
                </div>
            </main>
        </>
    );
};

export default Products;
