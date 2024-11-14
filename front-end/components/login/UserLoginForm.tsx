import { StatusMessage } from '@types';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

const UserLoginForm: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState<string | null>('');
    const [nameError, setNameError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        setNameError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!name || name.trim() === '') {
            setNameError('Name is required.');
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        clearErrors();
        if (!validate()) {
            return;
        }
        setStatusMessages([
            {
                message: 'Login successful. Redirecting to homepage...',
                type: 'success',
            },
        ]);
        sessionStorage.setItem('loggedInUserEmail', name!);
        setTimeout(() => router.push('/'), 2000);
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
                <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
                    Username:
                </label>
                <div className="block mb-2 text-sm font-medium">
                    <input
                        id="nameInput"
                        type="text"
                        value={name ?? ''}
                        onChange={(event) => setName(event.target.value)}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                    {nameError && <div className="text-red-800">{nameError} </div>}
                </div>

                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </>
    );
};

export default UserLoginForm;
