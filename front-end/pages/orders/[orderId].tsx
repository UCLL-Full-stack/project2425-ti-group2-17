import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import OrderInfo from '@components/orders/orderInfo';
import OrderService from '@services/OrderService';
import { Order } from '@types';
import Header from '@components/header';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const OrderPage: React.FC = () => {
    const [order, setOrder] = useState<Order | null>(null);
    const router = useRouter();
    const { orderId } = router.query;
    const { t } = useTranslation();

    useEffect(() => {
        if (orderId) {
            const fetchOrder = async () => {
                try {
                    const data = await OrderService.getOrderById(orderId as string);
                    setOrder(data);
                } catch (error) {
                    console.error('Failed to fetch order:', error);
                }
            };

            fetchOrder();
        }
    }, [orderId]);

    if (!order) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Header />
            <OrderInfo order={order} />
        </div>
    );
};

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default OrderPage;
