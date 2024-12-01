import CustomerService from '@services/CustomerService';
import { Customer, StatusMessage } from '@types';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

const UserRegisterForm: React.FC = () => {
    const router = useRouter();
    const [firstName, setFirstName] = useState<string | null>('');
    const [firstNameError, setFirstNameError] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>('');
    const [lastNameError, setLastNameError] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>('');
    const [confirmationPassword, setConfirmationPassword] = useState<string | null>('');
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        setFirstNameError(null);
        setLastNameError(null);
        setEmailError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!firstName || firstName.trim() === '') {
            setFirstNameError('FirstName is required.');
            result = false;
        }

        if (!lastName || lastName.trim() === '') {
            setLastNameError('Lastname is required.');
            result = false;
        }

        if (!email || email.trim() === '') {
            setEmailError('Email is required.');
            result = false;
        }
        if (!password || password.trim() === '') {
            setPasswordError('Password is required.');
            result = false;
        }

        if (!confirmationPassword || confirmationPassword.trim() === '') {
            setPasswordError('Confirmation password is required.');
            result = false;
        }

        if (password !== confirmationPassword) {
            setPasswordError('Passwords must match.');
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
            const customerInput: Customer = {
                firstName: firstName!,
                lastName: lastName!,
                email: email!,
                password: password!,
            };

            const customer = await CustomerService.createCustomer(customerInput);
            setStatusMessages([
                {
                    message: 'Signup successful. Redirecting to loginpage...',
                    type: 'success',
                },
            ]);
            setTimeout(() => router.push('/login'), 2000);
        } catch (err: any) {
            setStatusMessages([
                {
                    message: 'Signup unsuccessful.',
                    type: 'error',
                },
            ]);
        }
    };

    return (
        <>
            <h3 className="px-0">Signup</h3>
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
                <div className="block mb-2 text-sm font-medium">
                    <input
                        type="text"
                        value={firstName ?? ''}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="First name:"
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                    {firstNameError && <div className="text-red-800">{firstNameError} </div>}
                </div>
                <div className="block mb-2 text-sm font-medium">
                    <input
                        type="text"
                        value={lastName ?? ''}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Last name"
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                    {lastNameError && <div className="text-red-800">{lastNameError} </div>}
                </div>
                <div className="block mb-2 text-sm font-medium">
                    <input
                        type="text"
                        value={email ?? ''}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email:"
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                    {emailError && <div className="text-red-800">{emailError} </div>}
                </div>
                <div className="block mb-2 text-sm font-medium">
                    <input
                        type="text"
                        value={password ?? ''}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password:"
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                </div>
                <div className="block mb-2 text-sm font-medium">
                    <input
                        type="text"
                        value={confirmationPassword ?? ''}
                        onChange={(event) => setConfirmationPassword(event.target.value)}
                        placeholder="Confirm your password:"
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                    {passwordError && <div className="text-red-800">{passwordError} </div>}
                </div>

                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                >
                    Signup
                </button>
            </form>
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => router.push('/login')}
                type="button"
            >
                Login
            </button>
        </>
    );
};

export default UserRegisterForm;
