import Header from '@components/header';
import { Customer, DiscountCode, StatusMessage } from '@types';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import CartService from '@services/CartService';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';
import CustomerService from '@services/CustomerService';
import DiscountService from '@services/DiscountService';
import DiscountOverviewTable from '@components/discounts/DiscountOverviewTable';
import DiscountCodeEditor from '@components/discounts/DiscountEditor';

const Discounts: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<Customer | null>(null);

    const [selectedDiscountcode, setSelectedDiscountCode] = useState<DiscountCode | null>(null);
    const [isCreateDiscountCodeOpen, setIsCreateDiscountCodeOpen] = useState(false);
    const openCreateDiscountCode = () => {
        setSelectedDiscountCode(null);
        setIsCreateDiscountCodeOpen(true);
    };

    const closeDiscountCodeEditor = () => setIsCreateDiscountCodeOpen(false);

    const openUpdateDiscountCode = (discountCode: DiscountCode) => {
        setSelectedDiscountCode(discountCode);
        setIsCreateDiscountCodeOpen(true);
    };

    const handleSaveDiscountCode = async () => {
        setSelectedDiscountCode(null);
        setIsCreateDiscountCodeOpen(false);
        mutate('discounts', getDiscounts());
    };

    const getDiscounts = async () => {
        if (loggedInUser) {
            const response = await DiscountService.getAllDiscounts();
            if (response.ok) {
                const discountCodes = await response.json();
                return discountCodes;
            }
        }
    };

    const reloadDiscounts = () => {
        mutate('discounts', getDiscounts());
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
                <title>DiscountCodes</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                {error && <div className="text-red-800">{error}</div>}
                {isLoading && <p className="text-green-800">Loading...</p>}
                <div className="w-4/5 p-4">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <button
                            type="button"
                            onClick={() => openCreateDiscountCode()}
                            className="w-min bg-black text-white py-2 rounded px-1"
                        >
                            Create discount code
                        </button>
                    </div>
                    {data && loggedInUser && (
                        <DiscountOverviewTable
                            discounts={data}
                            loggedInUser={loggedInUser}
                            reloadDiscounts={reloadDiscounts}
                            openUpdateDiscountCode={openUpdateDiscountCode}
                        />
                    )}
                    <DiscountCodeEditor
                        isOpen={isCreateDiscountCodeOpen}
                        onClose={closeDiscountCodeEditor}
                        onSave={handleSaveDiscountCode}
                        discountToUpdate={selectedDiscountcode}
                    />
                </div>
            </main>
        </>
    );
};

export default Discounts;
