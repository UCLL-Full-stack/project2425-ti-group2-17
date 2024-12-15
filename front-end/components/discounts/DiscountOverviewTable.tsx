import React from 'react';
import { Product, Customer, DiscountCode } from '@types';
import Image from 'next/image';
import styles from '@styles/home.module.css';

type Props = {
    discounts: Array<DiscountCode>;
    loggedInUser: Customer;
};

const DiscountOverviewTable: React.FC<Props> = ({ discounts, loggedInUser }) => {
    return (
        <>
            {discounts && (
                <div className="container mx-auto px-4 flex flex-row flex-wrap">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-yellow-300">
                            <tr>
                                <th scope="col" className="py-2 px-4 text-left">
                                    Code
                                </th>
                                <th scope="col" className="py-2 px-4 text-left">
                                    Type
                                </th>
                                <th scope="col" className="py-2 px-4 text-left">
                                    Value
                                </th>
                                <th scope="col" className="py-2 px-4 text-left">
                                    Expiration date
                                </th>
                                <th scope="col" className="py-2 px-4 text-left">
                                    isActive
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {discounts.map((discount, index) => (
                                <tr
                                    key={discount.id}
                                    className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                >
                                    <td className="py-2 px-4 w-1/5">{discount.code}</td>
                                    <td className="py-2 px-4 w-1/5">{discount.type}</td>
                                    {discount.type === 'percentage' && (
                                        <td className="py-2 px-4 w-1/5">{discount.value}%</td>
                                    )}
                                    {discount.type === 'fixed' && (
                                        <td className="py-2 px-4 w-1/5">{discount.value}$</td>
                                    )}

                                    {/* <td className="py-2 px-4 w-1/5">
                                        {discount.expirationDate.toISOString()}
                                    </td> */}
                                    <td className="py-2 px-4 w-1/5">
                                        {new Date(discount.expirationDate).toLocaleDateString()}
                                    </td>
                                    {/* <td className="py-2 px-4 w-1/5">WIP</td> */}
                                    <td
                                        className={`${
                                            discount.isActive === true
                                                ? 'text-green-800'
                                                : 'text-red-800'
                                        } py-2 px-4 w-1/5`}
                                    >
                                        {discount.isActive.toString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default DiscountOverviewTable;
