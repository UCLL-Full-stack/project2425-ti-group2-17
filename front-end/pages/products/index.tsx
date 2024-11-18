import Header from '@components/header';
import { Product, ProductInput } from '@types';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import ProductService from '@services/ProductService';
import ProductOverviewTable from '@components/products/ProductOverviewTable';
import CartService from '@services/CartService';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const Products: React.FC = () => {
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [minPrice, setminPrice] = useState<number>(0);
    const [maxPrice, setmaxPrice] = useState<number>(1000);

    const filterProducts = (productData: Product[]): Product[] => {
        console.log(selectedSizes);
        return productData.filter(
            (product) =>
                (selectedSizes.length === 0 ||
                    product.sizes.some((size) => selectedSizes.includes(size))) &&
                (selectedColors.length === 0 ||
                    product.colors.some((color) => selectedColors.includes(color))) &&
                (selectedCategories.length === 0 ||
                    product.categories.some((category) => selectedCategories.includes(category))) &&
                (searchQuery === '' ||
                    product.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
                product.price >= minPrice &&
                product.price <= maxPrice
        );
    };

    const getProducts = async (): Promise<Product[]> => {
        try {
            const response = await ProductService.getAllProducts();
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const productData = await response.json();
            if (productData.length === 0) {
                throw new Error('No products found');
            }
            return filterProducts(productData);
        } catch (err: any) {
            throw err;
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
            throw new Error('All fields are required and must be valid.');
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
            // setError(null);
            await ProductService.createProduct(newProduct);
            getProducts();
        } catch (err: any) {
            throw new err();
        }
    };

    const updateProduct = async (id: number) => {
        const existingProduct = products?.find((product) => product.id === id);

        if (!existingProduct) {
            throw new Error('Product not found');
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
                .prompt('Enter new categories:', existingProduct.categories.join(', '))
                ?.split(',')
                .map((item) => item.trim()) || existingProduct.categories;
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
            // setError(null);
            await ProductService.updateProduct(id.toString(), updatedProduct);
            getProducts();
        } catch (err: any) {
            throw err.message;
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            // setError(null);
            const response = await ProductService.deleteProduct(id.toString());
            getProducts();
        } catch (err: any) {
            throw err.message;
        }
    };

    const addItemToCart = async (productId: number) => {
        try {
            const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail');
            if (loggedInUserEmail == null) {
                throw new Error('You must be logged in to add an item to your cart.');
            }
            await CartService.addItemToCart(loggedInUserEmail, productId.toString(), '1');
        } catch (err: any) {
            throw err.message;
        }
    };

    const handleSizeChange = (inputSize: string) => {
        if (selectedSizes.includes(inputSize)) {
            setSelectedSizes(selectedSizes.filter((size) => size !== inputSize));
        } else {
            setSelectedSizes([...selectedSizes, inputSize]);
        }
        // setSelectedSizes((currentSizes) =>
        //     currentSizes.includes(size) ? currentSizes.filter((s) => s !== size) : [...currentSizes, size]
        // );
    };

    const { data: products, isLoading, error } = useSWR('products', getProducts);

    useInterval(() => {
        mutate('products', getProducts());
    }, 1000);
    return (
        <>
            <Head>
                <title>Products</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Products</h1>
                {error && <div className="text-red-800">{error}</div>}
                {isLoading && <p className="text-green-800">Loading...</p>}
                <div className="block mb-2 text-sm font-medium">
                    <input
                        type="text"
                        value={searchQuery ?? ''}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="What are you looking for?"
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                </div>

                <div className="flex flex-col mb-2 text-sm font-medium">
                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                        <label key={size} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value={size}
                                checked={selectedSizes.includes(size)}
                                onChange={() => handleSizeChange(size)}
                                className="border border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span>{size}</span>
                        </label>
                    ))}
                </div>
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
