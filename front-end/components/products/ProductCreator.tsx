import ProductService from '@services/ProductService';
import { Product } from '@types';
import { useState, useEffect, FormEvent } from 'react';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (userId: number) => void;
};

const ProductCreator: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [categories, setCategories] = useState('');
    const [description, setDescription] = useState('');
    //   const [images, setImages] = useState("");
    const [sizes, setSizes] = useState('');
    const [colors, setColors] = useState('');

    const [nameError, setNameError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [stockError, setStockError] = useState('');
    const [categoriesError, setCategoriesError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    //   const [imagesError, setImagesError] = useState("");
    const [sizesError, setSizesError] = useState('');
    const [colorsError, setColorsError] = useState('');

    if (!isOpen) return null;

    const validate = () => {
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
        if (!categories || categories.length === 0) {
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
        if (!sizes || sizes.length === 0) {
            setSizesError('Sizes are required.');
            isValid = false;
        }
        if (!colors || colors.length === 0) {
            setColorsError('Colors are required.');
            isValid = false;
        }
        return isValid;
    };

    const handleSave = async (event: FormEvent) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        const newProduct: Product = {
            //   id: product.id,
            name,
            price: Number(price),
            stock: Number(stock),
            categories: categories.split(',').map((item) => item.trim()),
            description,
            images: [],
            sizes: sizes.split(',').map((item) => item.trim()),
            colors: colors.split(',').map((item) => item.trim()),
        };

        try {
            const response = await ProductService.createProduct(newProduct);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to update user:', JSON.stringify(errorData, null, 2));
                return;
            }

            const data = await response.json();
            onSave(data.id!);
            onClose();
        } catch (error) {
            console.error('An error occurred while updating the user:', error);
        }
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
                        {/* <div className="col-span-1">
                            <label className="block mb-1 text-sm font-semibold text-yellow-500">
                                Stock
                            </label>
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(Number(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded outline-none"
                            />

                            {stockError && <p className="text-red-500 text-sm">{stockError}</p>}
                        </div> */}
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
