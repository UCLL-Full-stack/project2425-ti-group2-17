import Header from '@components/header';
import Head from 'next/head';
import Image from 'next/image';
import styles from '@styles/home.module.css';

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
                <span>
                    {/* <Image
                        src="/images/courses.png"
                        alt="Courses Logo"
                        className={styles.vercelLogo}
                        width={50}
                        height={50}
                    /> */}
                    <h1>Welcome!</h1>
                </span>

                <div className={styles.description}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, harum
                        aperiam facere quaerat est soluta voluptatibus cumque voluptate eaque
                        adipisci ea magnam? Maiores sapiente temporibus, obcaecati vero quia
                        necessitatibus error!
                    </p>
                </div>
            </main>
        </>
    );
};

export default Home;
