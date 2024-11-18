import CustomerService from '@services/CustomerService';
import { StatusMessage } from '@types';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

const UserLoginForm: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string | null>('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>('');
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        setEmailError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!email || email.trim() === '') {
            setEmailError('Email is required.');
            result = false;
        }
        if (!password || password.trim() === '') {
            setPasswordError('Password is required.');
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: FormEvent) => {
        try {
            event.preventDefault();
            clearErrors();
            if (!validate()) {
                return;
            }
            const Customer = await CustomerService.loginCustomer(email!, password!);
            setStatusMessages([
                {
                    message: 'Login successful. Redirecting to homepage...',
                    type: 'success',
                },
            ]);
            sessionStorage.setItem('loggedInUserEmail', email!);
            sessionStorage.setItem('loggedInUserId', Customer.id!);
            setTimeout(() => router.push('/'), 2000);
        } catch (err: any) {
            console.log();
            setStatusMessages([
                {
                    message: 'Login unsuccessful.',
                    type: 'error',
                },
            ]);
        }
    };

    return (
        <>
            <h3 className="px-0">Login</h3>
            {statusMessages && (
                <div className="row">
                    <ul className="list-none mb-3 mx-auto ">
                        {statusMessages.map(({ message, type }, index) => (
                            <li
                                key={index}
                                className={classNames({
                                    'text-red-800': type === 'error',
                                    'text-green-800': type === 'success',
                                })}
                            >
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="emailInput" className="block mb-2 text-sm font-medium">
                    Email:
                </label>
                <div className="block mb-2 text-sm font-medium">
                    <input
                        id="emailInput"
                        type="text"
                        value={email ?? ''}
                        onChange={(event) => setEmail(event.target.value)}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                    {emailError && <div className="text-red-800">{emailError} </div>}
                </div>

                <label htmlFor="passwordInput" className="block mb-2 text-sm font-medium">
                    Password:
                </label>
                <div className="block mb-2 text-sm font-medium">
                    <input
                        id="passwordInput"
                        type="text"
                        value={password ?? ''}
                        onChange={(event) => setPassword(event.target.value)}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                    {passwordError && <div className="text-red-800">{passwordError} </div>}
                </div>

                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                >
                    Login
                </button>
            </form>
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => router.push('/register')}
                type="button"
            >
                Register
            </button>
        </>
    );
};

export default UserLoginForm;
