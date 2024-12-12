import ProductService from '@services/ProductService';
import { Product } from '@types';
import { useState, useEffect, FormEvent } from 'react';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
};

const ProductCreator: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [description, setDescription] = useState('');
    //   const [images, setImages] = useState<string[]>([]);
    const [sizes, setSizes] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);

    const [nameError, setNameError] = useState<string | null>(null);
    const [priceError, setPriceError] = useState<string | null>(null);
    const [stockError, setStockError] = useState<string | null>(null);
    const [categoriesError, setCategoriesError] = useState<string | null>(null);
    const [descriptionError, setDescriptionError] = useState<string | null>(null);
    //   const [imagesError, setImagesError] = useState<string | null>(null);
    const [sizesError, setSizesError] = useState<string | null>(null);
    const [colorsError, setColorsError] = useState<string | null>(null);

    if (!isOpen) return null;

    const stringToList = (inputString: string) => {
        return inputString.split(',').map((category) => category.trim());
    };

    const clearErrors = () => {
        setNameError(null);
        setPriceError(null);
        setStockError(null);
        setCategoriesError(null);
        setDescriptionError(null);
        // setImagesError(null);
        setSizesError(null);
        setColorsError(null);
        // setStatusMessages([]);
    };

    const validate = (
        cleanedCategories?: string[],
        cleanedSizes?: string[],
        cleanedColors?: string[]
    ) => {
        let isValid = true;

        if (!name || name.trim() === '') {
            setNameError('Name is required.');
            isValid = false;
        }
        if (!price) {
            setPriceError('Price is required.');
            isValid = false;
        }
        if (!stock) {
            setStockError('Stock is required.');
            isValid = false;
        }
        if (!cleanedCategories || cleanedCategories.length === 0) {
            setCategoriesError('Categories are required.');
            isValid = false;
        }
        if (!description || description.trim() === '') {
            setDescriptionError('Description is required.');
            isValid = false;
        }
        // if (!images || images.length===0) {
        //     setImagesError('Images are required.');
        //     isValid = false;
        // }
        if (!cleanedSizes || cleanedSizes.length === 0) {
            setSizesError('Sizes are required.');
            isValid = false;
        } else if (
            !cleanedSizes.every(
                (size) =>
                    size === 'XS' || size === 'S' || size === 'M' || size === 'L' || size === 'XL'
            )
        ) {
            setSizesError('All sizes must be XS or S or M or L or XL seperated by commas.');
        }
        if (!cleanedColors || cleanedColors.length === 0) {
            setColorsError('Colors are required.');
            isValid = false;
        }
        return isValid;
    };

    const cleanData = (data: string[]) => {
        return Array.from(new Set(data.filter((item) => item.trim() !== '')));
    };

    const handleSave = async (event: FormEvent) => {
        event.preventDefault();

        clearErrors();
        const cleanedCategories = cleanData(categories);
        const cleanedSizes = cleanData(sizes);
        const cleanedColors = cleanData(colors);

        if (!validate(cleanedCategories, cleanedSizes, cleanedColors)) {
            return;
        }
        const newProduct: Product = {
            //   id: product.id,
            name,
            price: Number(price),
            stock: Number(stock),
            // categories: filteredCategories,
            categories: cleanedCategories,
            description,
            images: ['unimplemented'],
            sizes: cleanedSizes,
            colors: cleanedColors,
        };

        console.log('product');
        console.log(newProduct);

        const response = await ProductService.createProduct(newProduct);
        if (response.ok) {
            const data = await response.json();
            const savedProductId: string = data.id;
            onSave();
            onClose();
        }
        // else {
        //   console.error("Failed to create product: " + data);
        // }
    };

    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-screen-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    &#x2715;
                </button>

                <h2 className="text-2xl font-bold mb-6">Create product</h2>
                <form onSubmit={handleSave}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <label className="block mb-1 text-sm font-semibold text-yellow-500">
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded outline-none"
                            />
                            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-1 text-sm font-semibold text-yellow-500">
                                Description
                            </label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded outline-none"
                            />
                            {descriptionError && (
                                <p className="text-red-500 text-sm">{descriptionError}</p>
                            )}
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-1 text-sm font-semibold text-yellow-500">
                                Price
                            </label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded outline-none"
                            />

                            {priceError && <p className="text-red-500 text-sm">{priceError}</p>}
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-1 text-sm font-semibold text-yellow-500">
                                Stock
                            </label>
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded outline-none"
                            />

                            {stockError && <p className="text-red-500 text-sm">{stockError}</p>}
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-1 text-sm font-semibold text-yellow-500">
                                Categories
                            </label>
                            <input
                                type="text"
                                value={categories.join(',')}
                                onChange={(e) => setCategories(stringToList(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded outline-none"
                            />

                            {categoriesError && (
                                <p className="text-red-500 text-sm">{categoriesError}</p>
                            )}
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-1 text-sm font-semibold text-yellow-500">
                                Sizes
                            </label>
                            <input
                                type="text"
                                value={sizes.join(',')}
                                onChange={(e) => setSizes(stringToList(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded outline-none"
                            />

                            {sizesError && <p className="text-red-500 text-sm">{sizesError}</p>}
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-1 text-sm font-semibold text-yellow-500">
                                Colors
                            </label>
                            <input
                                type="text"
                                value={colors.join(',')}
                                onChange={(e) => setColors(stringToList(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded outline-none"
                            />

                            {colorsError && <p className="text-red-500 text-sm">{colorsError}</p>}
                        </div>
                        <button
                            className="mt-6 w-full p-2 bg-yellow-500 text-white font-semibold rounded"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductCreator;
