import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import OrderInfo from '@components/orders/orderInfo';
import OrderService from '@services/OrderService';
import { Order } from '@types';
import Header from '@components/header';

const OrderPage: React.FC = () => {
    const [order, setOrder] = useState<Order | null>(null);
    const router = useRouter();
    const { orderId } = router.query;

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

export default OrderPage;
