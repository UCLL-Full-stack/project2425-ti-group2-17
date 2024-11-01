import Header from '@components/header';
import { Product } from '@types';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import ProductService from '@services/ProductService';
import ProductOverviewTable from '@components/products/ProductOverviewTable';

const Products: React.FC = () => {
    const [products, setProducts] = useState<Array<Product>>();

    const getProducts = async () => {
        const response = await ProductService.getAllProducts();
        const products = await response.json();
        setProducts(products);
    };

    useEffect(() => {
        getProducts();
    }, []);
    return (
        <>
            <Head>
                <title>Products</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Products</h1>
                <section>
                    <h2>Products overview</h2>
                    {products && <ProductOverviewTable products={products} />}
                </section>
            </main>
        </>
    );
};

export default Products;
