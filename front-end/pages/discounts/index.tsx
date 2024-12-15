import Header from '@components/header';
import { Customer, Product, StatusMessage } from '@types';
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
import DiscountService from '@services/DiscountService';
import DiscountOverviewTable from '@components/discounts/DiscountOverviewTable';

const Discounts: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<Customer | null>(null);

    const getDiscounts = async () => {
        if (loggedInUser) {
            const response = await DiscountService.getAllDiscounts();
            if (response.ok) {
                const products = await response.json();
                return products;
            }
        }
    };

    const { data, isLoading, error } = useSWR('discounts', getDiscounts);

    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')!));
    }, []);

    useInterval(() => {
        mutate('discounts', getDiscounts());
    }, 4000);

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
                        <DiscountOverviewTable discounts={data} loggedInUser={loggedInUser} />
                    )}
                </div>
            </main>
        </>
    );
};

export default Discounts;
