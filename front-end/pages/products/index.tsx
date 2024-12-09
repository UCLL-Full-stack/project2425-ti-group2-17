import Header from '@components/header';
import { Customer, Product } from '@types';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import ProductService from '@services/ProductService';
import ProductOverviewTable from '@components/products/ProductOverviewTable';
import CartService from '@services/CartService';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';
import ProductCreator from '@components/products/ProductCreator';
import CustomerService from '@services/CustomerService';

const Products: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<Customer | null>(null);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [uniqueColors, setUniqueColors] = useState<string[]>([]);
    const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(1000);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);

    const [isCreateProductOpen, setIsCreateProductOpen] = useState(false);
    const openCreateProduct = () => setIsCreateProductOpen(true);
    const closeCreateProduct = () => setIsCreateProductOpen(false);

    const handleSaveProduct = async (newProductId: number) => {
        // setSelectedProduct(newProductId);
        // setIsModalOpen(true);
    };

    const filterProducts = (productData: Product[]) => {
        if (minPrice < 0) {
            setMinPrice(0);
        }
        if (maxPrice < 0) {
            setMaxPrice(1000);
        } else if (maxPrice < minPrice) {
            setMaxPrice(minPrice);
        }
        setFilteredProducts(
            productData.filter(
                (product) =>
                    (selectedSizes.length === 0 ||
                        product.sizes.some((size) => selectedSizes.includes(size))) &&
                    (selectedColors.length === 0 ||
                        product.colors.some((color) => selectedColors.includes(color))) &&
                    (selectedCategories.length === 0 ||
                        product.categories.some((category) =>
                            selectedCategories.includes(category)
                        )) &&
                    (searchQuery === '' ||
                        product.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
                    product.price >= minPrice &&
                    product.price <= maxPrice
            )
        );
    };

    const getUniqueColorsAndCategories = (products: Product[]) => {
        const colors = new Set<string>(products.flatMap((product: Product) => product.colors));
        const categories = new Set<string>(
            products.flatMap((product: Product) => product.categories)
        );
        setUniqueColors(Array.from(colors));
        setUniqueCategories(Array.from(categories));
    };

    const handleSizeChange = (inputSize: string) => {
        if (selectedSizes.includes(inputSize)) {
            setSelectedSizes(selectedSizes.filter((size) => size !== inputSize));
        } else {
            setSelectedSizes([...selectedSizes, inputSize]);
        }
    };

    const handleColorChange = (inputColor: string) => {
        if (selectedColors.includes(inputColor)) {
            setSelectedColors(selectedColors.filter((color) => color !== inputColor));
        } else {
            setSelectedColors([...selectedColors, inputColor]);
        }
    };

    const handleCategoryChange = (inputCategory: string) => {
        if (selectedCategories.includes(inputCategory)) {
            setSelectedCategories(
                selectedCategories.filter((category) => category !== inputCategory)
            );
        } else {
            setSelectedCategories([...selectedCategories, inputCategory]);
        }
    };

    const getProducts = async () => {
        const response = await ProductService.getAllProducts();
        if (!response.ok) {
            if (response.status === 401) {
                return new Error('You must be logged in to view this page.');
            } else {
                return new Error(response.statusText);
            }
        } else {
            const products = await response.json();
            getUniqueColorsAndCategories(products);
            filterProducts(products);
            return filteredProducts;
        }
    };

    const createProduct = async () => {
        // const name = window.prompt('Enter new name:');
        // const price = Number(window.prompt('Enter new price:'));
        // const stock = Number(window.prompt('Enter new stock:'));
        // const description = window.prompt('Enter new description:');
        // const categories = window
        //     .prompt('Enter new categories with commas and a space in between:')
        //     ?.split(',')
        //     .map((item) => item.trim());
        // const sizes = window
        //     .prompt('Enter new sizes with commas and a space in between:')
        //     ?.split(',')
        //     .map((item) => item.trim());
        // const colors = window
        //     .prompt('Enter new colors with commas and a space in between:')
        //     ?.split(',')
        //     .map((item) => item.trim());
        // // const images =
        // //     window
        // //         .prompt(
        // //             'Enter new images:',
        // //             existingProduct.images.join(', ')
        // //         )
        // //         ?.split(',')
        // //         .map((item) => item.trim()) || existingProduct.images;
        // if (!name || !description || !price || !stock || !categories || !sizes || !colors) {
        //     throw new Error('All fields are required and must be valid.');
        // }
        // const newProduct: ProductInput = {
        //     name,
        //     price,
        //     stock,
        //     categories,
        //     description,
        //     images: ['temp'],
        //     sizes,
        //     colors,
        // };
        // try {
        //     // setError(null);
        //     await ProductService.createProduct(newProduct);
        //     getProducts();
        // } catch (err: any) {
        //     throw new err();
        // }
    };

    const updateProduct = async (id: number) => {
        // const existingProduct = products?.find((product) => product.id === id);
        // if (!existingProduct) {
        //     throw new Error('Product not found');
        //     return;
        // }
        // const name = window.prompt('Enter new name:', existingProduct.name) || existingProduct.name;
        // const price =
        //     Number(window.prompt('Enter new price:', existingProduct.price.toString())) ||
        //     existingProduct.price;
        // const stock =
        //     Number(window.prompt('Enter new stock:', existingProduct.stock.toString())) ||
        //     existingProduct.stock;
        // const description =
        //     window.prompt('Enter new description:', existingProduct.description) ||
        //     existingProduct.description;
        // const categories =
        //     window
        //         .prompt('Enter new categories:', existingProduct.categories.join(', '))
        //         ?.split(',')
        //         .map((item) => item.trim()) || existingProduct.categories;
        // const sizes =
        //     window
        //         .prompt('Enter new sizes:', existingProduct.sizes.join(', '))
        //         ?.split(',')
        //         .map((item) => item.trim()) || existingProduct.sizes;
        // const colors =
        //     window
        //         .prompt('Enter new colors:', existingProduct.colors.join(', '))
        //         ?.split(',')
        //         .map((item) => item.trim()) || existingProduct.colors;
        // // const images =
        // //     window
        // //         .prompt(
        // //             'Enter new images:',
        // //             existingProduct.images.join(', ')
        // //         )
        // //         ?.split(',')
        // //         .map((item) => item.trim()) || existingProduct.images;
        // const updatedProduct: ProductInput = {
        //     name,
        //     price,
        //     stock,
        //     categories,
        //     description,
        //     images: existingProduct.images,
        //     sizes,
        //     colors,
        // };
        // try {
        //     // setError(null);
        //     await ProductService.updateProduct(id.toString(), updatedProduct);
        //     getProducts();
        // } catch (err: any) {
        //     throw err.message;
        // }
    };

    const deleteProduct = async (id: number) => {
        const response = await ProductService.deleteProduct(id.toString());
        if (!response.ok) {
            if (response.status === 401) {
                return new Error('You must be an admin to delete a product.');
            } else {
                return new Error(response.statusText);
            }
        } else {
            mutate('products', getProducts());
        }
    };

    const addItemToCart = async (productId: number) => {
        const response = await CartService.addItemToCart(
            loggedInUser?.email!,
            productId.toString(),
            '1'
        );
        if (!response.ok) {
            if (response.status === 401) {
                return new Error('You must be an admin to delete a product.');
            } else {
                return new Error(response.statusText);
            }
        }
    };

    const addToWishlist = async (email: string, productId: number) => {
        const response = await CustomerService.addToWishlist(email, productId.toString());
        if (!response.ok) {
            if (response.status === 401) {
                return new Error('You must be logged in to add a product to your wishlist.');
            } else {
                return new Error(response.statusText);
            }
        }
    };

    const removeFromWishlist = async (email: string, productId: number) => {
        const response = await CustomerService.removeFromWishlist(
            loggedInUser?.email!,
            productId.toString()
        );
        if (!response.ok) {
            if (response.status === 401) {
                return new Error('You must be logged in to add a product to your wishlist.');
            } else {
                return new Error(response.statusText);
            }
        }
    };

    const { data, isLoading, error } = useSWR('products', getProducts);

    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')!));
    }, []);

    useInterval(() => {
        mutate('products', getProducts());
    }, 10000);

    useEffect(() => {
        filterProducts(allProducts);
    }, [selectedSizes, selectedColors, selectedCategories, searchQuery, minPrice, maxPrice]);
    useEffect(() => {
        if (Array.isArray(data)) {
            setAllProducts(data);
            getUniqueColorsAndCategories(data);
        }
    }, [data]);

    return (
        <>
            <Head>
                <title>Products</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                {error && <div className="text-red-800">{error}</div>}
                {isLoading && <p className="text-green-800">Loading...</p>}
                <section className="block mb-2 text-sm font-medium">
                    <input
                        type="text"
                        value={searchQuery ?? ''}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="What are you looking for?"
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                </section>

                <section className="flex">
                    <div className="w-1/5 p-4">
                        <div className="flex flex-col mb-2 text-sm font-medium">
                            <p className="font-medium border-b-2 border-yellow-400 mb-2">Sizes</p>
                            <div className="flex flex-col max-h-60 overflow-y-auto">
                                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                    <label key={size} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            value={size}
                                            checked={selectedSizes.includes(size)}
                                            onChange={() => handleSizeChange(size)}
                                            className="border border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        {size}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {uniqueColors && (
                            <div className="flex flex-col mb-2 text-sm font-medium">
                                <p className="font-medium border-b-2 border-yellow-400 mb-2">
                                    Colors
                                </p>
                                <div className="flex flex-col max-h-60 overflow-y-auto">
                                    {uniqueColors.map((color) => (
                                        <label key={color} className="flex items-center gap-2 mb-1">
                                            <input
                                                type="checkbox"
                                                value={color}
                                                checked={selectedColors.includes(color)}
                                                onChange={() => handleColorChange(color)}
                                                className="border border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            {color}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {uniqueCategories && (
                            <div className="flex flex-col mb-2 text-sm font-medium">
                                <p className="font-medium border-b-2 border-yellow-400 mb-2">
                                    Categories
                                </p>
                                <div className="flex flex-col max-h-60 overflow-y-auto">
                                    {uniqueCategories.map((category) => (
                                        <label
                                            key={category}
                                            className="flex items-center gap-2 mb-1"
                                        >
                                            <input
                                                type="checkbox"
                                                value={category}
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => handleCategoryChange(category)}
                                                className="border border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            {category}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col mb-2 text-sm font-medium">
                            <p className="font-medium border-b-2 border-yellow-400 mb-2">Price</p>
                            <div className="flex flex-col max-h-60 overflow-y-auto">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(Number(e.target.value))}
                                        className="border border-gray-300 rounded focus:ring-blue-500 w-16"
                                    />
                                    <input
                                        type="number"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                                        className="border border-gray-300 rounded focus:ring-blue-500 w-16"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <button
                                type="button"
                                onClick={() => createProduct()}
                                className="w-min bg-black text-white py-2 rounded px-1"
                            >
                                Create product
                            </button>
                        </div>
                    </div>

                    <div className="w-4/5 p-4">
                        {filteredProducts && loggedInUser && (
                            <ProductOverviewTable
                                products={filteredProducts}
                                loggedInUser={loggedInUser}
                                updateProduct={updateProduct}
                                deleteProduct={deleteProduct}
                                addItemToCart={addItemToCart}
                                addToWishlist={addToWishlist}
                            />
                        )}
                        <ProductCreator
                            isOpen={isCreateProductOpen}
                            onClose={closeCreateProduct}
                            onSave={handleSaveProduct}
                        />
                    </div>
                </section>
            </main>
        </>
    );
};

export default Products;
