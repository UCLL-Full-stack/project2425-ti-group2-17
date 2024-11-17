import Head from 'next/head';
import Header from '@components/header';
import UserRegisterForm from '@components/register/UserRegisterForm';

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>User register</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserRegisterForm />
                </section>
            </main>
        </>
    );
};

export default Login;
