import Header from '@components/header';
import Head from 'next/head';

const Order: React.FC = () => {
    return (
        <>
            <Head>
                <title>Orders</title>
            </Head>
            <Header />
            <h1>Orders Page</h1>
        </>
    );
};

export default Order;
