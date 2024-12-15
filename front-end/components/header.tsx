import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Customer } from '@types';

const Header: React.FC = () => {
    const router = useRouter();
    const [loggedInUser, setLoggedInUser] = useState<Customer | null>(null);

    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')!));
    }, []);

    const handleClick = () => {
        sessionStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
    };

    return (
        <nav className="border-gray-200" style={{ backgroundColor: '#0000a3' }}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link
                    href="/"
                    className="flex items-center text-3xl font-extrabold tracking-wide text-gray-900 dark:text-white uppercase"
                >
                    JB Clothing
                </Link>
                <div className="flex items-center space-x-4">
                    <Link
                        href="/"
                        className="block py-2 px-4 text-gray-900 dark:text-white border-2 border-transparent rounded hover:border-white"
                    >
                        Home
                    </Link>
                    {loggedInUser && (
                        <Link
                            href="/products"
                            className="block py-2 px-4 text-gray-900 dark:text-white border-2 border-transparent rounded hover:border-white"
                        >
                            Products
                        </Link>
                    )}

                    {loggedInUser && (
                        <Link
                            href="/orders"
                            className="block py-2 px-4 text-gray-900 dark:text-white border-2 border-transparent rounded hover:border-white"
                        >
                            Orders
                        </Link>
                    )}

                    {loggedInUser && (
                        <Link
                            href="/discounts"
                            className="block py-2 px-4 text-gray-900 dark:text-white border-2 border-transparent rounded hover:border-white"
                        >
                            Discounts
                        </Link>
                    )}

                    {!loggedInUser && (
                        <Link
                            href="/login"
                            className="block py-2 px-4 text-gray-900 dark:text-white border-2 border-transparent rounded hover:border-white"
                        >
                            Login
                        </Link>
                    )}
                    {loggedInUser && (
                        <a
                            href="/login"
                            className="block py-2 px-4 text-gray-900 dark:text-white border-2 border-transparent rounded hover:border-white"
                            onClick={handleClick}
                        >
                            Logout
                        </a>
                    )}
                    {loggedInUser && (
                        <div className="block py-2 px-4 text-gray-900 dark:text-white">
                            Welcome, {loggedInUser.fullname}!
                        </div>
                    )}
                    {loggedInUser && (
                        <button
                            onClick={() => router.push('/checkout')}
                            className="flex items-center py-2 px-4 text-gray-900 dark:text-white border-2 border-transparent rounded hover:border-white"
                        >
                            <Image
                                src="/images/shopping-cart.png"
                                alt="Go to checkout"
                                width={30}
                                height={30}
                                className="mr-2"
                            />
                        </button>
                    )}
                    {loggedInUser && (
                        <button
                            onClick={() => router.push('/wishlist')}
                            className="flex items-center py-2 px-4 text-gray-900 dark:text-white border-2 border-transparent rounded hover:border-white"
                        >
                            <Image
                                src="/images/wishlist.png"
                                alt="Go to wishlist"
                                width={30}
                                height={30}
                                className="mr-2"
                            />
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
