import Header from '@components/header';
import Head from 'next/head';
import Image from 'next/image';
import styles from '@styles/home.module.css';
import UserOverviewTable from '@components/home/UserOverviewTable';

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Clothing Store App" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.main}>
                <UserOverviewTable />
            </main>
        </>
    );
};

export default Home;
