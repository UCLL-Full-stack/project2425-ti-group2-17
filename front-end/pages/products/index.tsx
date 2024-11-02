import Header from '@components/header';
import { Product, ProductInput } from '@types';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import ProductService from '@services/ProductService';
import ProductOverviewTable from '@components/products/ProductOverviewTable';
import CartService from '@services/CartService';

const Products: React.FC = () => {
    const [products, setProducts] = useState<Array<Product>>();
    const [error, setError] = useState<string | null>(null);

    const getProducts = async () => {
        try {
            const response = await ProductService.getAllProducts();
            const products = await response.json();
            setProducts(products);
        } catch (err: any) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to get products.');
            }
        }
    };

    const createProduct = async () => {
        const name = window.prompt('Enter new name:');
        const price = Number(window.prompt('Enter new price:'));
        const stock = Number(window.prompt('Enter new stock:'));
        const description = window.prompt('Enter new description:');
        const category = window
            .prompt('Enter new categories with commas and a space in between:')
            ?.split(',')
            .map((item) => item.trim());
        const sizes = window
            .prompt('Enter new sizes with commas and a space in between:')
            ?.split(',')
            .map((item) => item.trim());
        const colors = window
            .prompt('Enter new colors with commas and a space in between:')
            ?.split(',')
            .map((item) => item.trim());
        // const images =
        //     window
        //         .prompt(
        //             'Enter new images:',
        //             existingProduct.images.join(', ')
        //         )
        //         ?.split(',')
        //         .map((item) => item.trim()) || existingProduct.images;

        if (!name || !description || !price || !stock || !category || !sizes || !colors) {
            setError('All fields are required and must be valid.');
            return;
        }

        const newProduct: ProductInput = {
            name,
            price,
            stock,
            category,
            description,
            images: ['temp'],
            sizes,
            colors,
        };

        try {
            setError(null);
            await ProductService.createProduct(newProduct);
            getProducts();
        } catch (err: any) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to create product.');
            }
        }
    };

    const updateProduct = async (id: number) => {
        const existingProduct = products?.find((product) => product.id === id);

        if (!existingProduct) {
            setError('Product not found');
            return;
        }

        const name = window.prompt('Enter new name:', existingProduct.name) || existingProduct.name;
        const price =
            Number(window.prompt('Enter new price:', existingProduct.price.toString())) ||
            existingProduct.price;
        const stock =
            Number(window.prompt('Enter new stock:', existingProduct.stock.toString())) ||
            existingProduct.stock;
        const description =
            window.prompt('Enter new description:', existingProduct.description) ||
            existingProduct.description;
        const category =
            window
                .prompt('Enter new categories:', existingProduct.category.join(', '))
                ?.split(',')
                .map((item) => item.trim()) || existingProduct.category;
        const sizes =
            window
                .prompt('Enter new sizes:', existingProduct.sizes.join(', '))
                ?.split(',')
                .map((item) => item.trim()) || existingProduct.sizes;
        const colors =
            window
                .prompt('Enter new colors:', existingProduct.colors.join(', '))
                ?.split(',')
                .map((item) => item.trim()) || existingProduct.colors;
        // const images =
        //     window
        //         .prompt(
        //             'Enter new images:',
        //             existingProduct.images.join(', ')
        //         )
        //         ?.split(',')
        //         .map((item) => item.trim()) || existingProduct.images;

        const updatedProduct: ProductInput = {
            name,
            price,
            stock,
            category,
            description,
            images: existingProduct.images,
            sizes,
            colors,
        };

        try {
            setError(null);
            await ProductService.updateProduct(id.toString(), updatedProduct);
            getProducts();
        } catch (err: any) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed update product.');
            }
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            setError(null);
            const response = await ProductService.deleteProduct(id.toString());
            getProducts();
        } catch (err: any) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to delete product.');
            }
        }
    };

    const addItemToCart = async (productId: number): Promise<number> => {
        try {
            const response = await CartService.addItemToCart('4', productId.toString(), '1');
            const cartItem = await response.json();
            return cartItem.getQuantity() || 0;
        } catch (err: any) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to add product to cart.');
            }
            return 0;
        }
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
                {error && <div className="alert alert-danger">{error}</div>}
                <section>
                    {products && (
                        <ProductOverviewTable
                            products={products}
                            createProduct={createProduct}
                            updateProduct={updateProduct}
                            deleteProduct={deleteProduct}
                            addItemToCart={addItemToCart}
                        />
                    )}
                </section>
            </main>
        </>
    );
};

export default Products;
