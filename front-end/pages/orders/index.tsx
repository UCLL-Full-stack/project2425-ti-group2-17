import Header from '@components/header';
import OrdersTable from '@components/orders/ordersTable';
import Head from 'next/head';

const Order: React.FC = () => {
    return (
        <>
            <Head>
                <title>Orders</title>
            </Head>
            <Header />
            <OrdersTable />
        </>
    );
};

export default Order;
