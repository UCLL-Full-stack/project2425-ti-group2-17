import React from 'react';
import { Product } from '@types';

type Props = {
    products: Array<Product>;
};

const ProductOverviewTable: React.FC<Props> = ({ products }: Props) => {
    return (
        <>
            {products && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Firstname</th>
                            <th scope="col">Lastname</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{'test'}</td>
                                <td>{'test'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default ProductOverviewTable;
