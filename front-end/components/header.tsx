import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Header: React.FC = () => {
    const router = useRouter();
    const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);
    const [loggedInUserEmail, setLoggedInUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('loggedInUserId');
        const userEmail = sessionStorage.getItem('loggedInUserEmail');

        if (userId) {
            setLoggedInUserId(parseInt(userId));
        } else {
            setLoggedInUserId(null);
        }

        setLoggedInUserEmail(userEmail);
    }, []);

    const handleClick = () => {
        sessionStorage.removeItem('loggedInUserId');
        setLoggedInUserId(null);
        sessionStorage.removeItem('loggedInUserEmail');
        setLoggedInUserEmail(null);
    };
    return (
        <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
            <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
                {' '}
                Clothing Store App
            </a>
            <nav className="nav justify-content-center">
                <Link href="/" className="nav-link px-4 fs-5 text-white">
                    Home
                </Link>
                <Link href="/products" className="nav-link px-4 fs-5 text-white">
                    Products
                </Link>
                <button
                    onClick={() => {
                        router.push('/checkout');
                    }}
                    className="flex items-center bg-white border rounded p-2 mt-2 transition duration-200 hover:bg-gray-200"
                >
                    <Image
                        src="/images/shopping-cart.png"
                        alt="Add to Cart"
                        width={30}
                        height={30}
                        className="mr-2"
                    />
                </button>
                {!loggedInUserEmail && (
                    <Link href="/login" className="nav-link px-4 fs-5 text-white">
                        Login
                    </Link>
                )}
                {loggedInUserEmail && (
                    <a
                        href="/login"
                        className="nav-link px-4 fs-5 text-white"
                        onClick={handleClick}
                    >
                        Logout
                    </a>
                )}
                {loggedInUserEmail && (
                    <div className="nav-link px-4 fs-5 text-white">
                        Welcome, {loggedInUserEmail}!
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
