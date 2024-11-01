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

    const updateProduct = async (id: number) => {
        console.log('test');
        const response = await ProductService.deleteProduct(id as unknown as string);
        getProducts();
    };

    const deleteProduct = async (id: number) => {
        console.log('test');
        const response = await ProductService.deleteProduct(id as unknown as string);
        getProducts();
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
                    {products && (
                        <ProductOverviewTable
                            products={products}
                            updateProduct={updateProduct}
                            deleteProduct={deleteProduct}
                        />
                    )}
                </section>
            </main>
        </>
    );
};

export default Products;
