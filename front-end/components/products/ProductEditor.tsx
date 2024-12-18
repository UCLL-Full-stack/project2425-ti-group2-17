import ProductService from '@services/ProductService';
import { Product, StatusMessage } from '@types';
import classNames from 'classnames';
import { useState, useEffect, FormEvent } from 'react';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    productToUpdate?: Product | null;
};

const ProductEditor: React.FC<Props> = ({ isOpen, onClose, onSave, productToUpdate }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [categories, setCategories] = useState('');
    const [description, setDescription] = useState('');
    //   const [images, setImages] = useState<string[]>([]);
    const [sizes, setSizes] = useState<string[]>([]);
    const [colors, setColors] = useState('');

    const [nameError, setNameError] = useState<string | null>(null);
    const [priceError, setPriceError] = useState<string | null>(null);
    const [stockError, setStockError] = useState<string | null>(null);
    const [categoriesError, setCategoriesError] = useState<string | null>(null);
    const [descriptionError, setDescriptionError] = useState<string | null>(null);
    //   const [imagesError, setImagesError] = useState<string | null>(null);
    const [sizesError, setSizesError] = useState<string | null>(null);
    const [colorsError, setColorsError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [updatingProduct, setUpdatingProduct] = useState(false);

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
        setStatusMessages([]);
    };

    const validate = (cleanedSizes: string[]) => {
        let isValid = true;

        if (!name || name.trim() === '') {
            setNameError('Name is required.');
            isValid = false;
        }
        if (!price) {
            setPriceError('Price is required.');
            isValid = false;
        } else if (price < 0) {
            setPriceError('Price may not be negative.');
            isValid = false;
        }
        if (!stock) {
            setStockError('Stock is required.');
            isValid = false;
        } else if (stock < 0) {
            setStockError('Stock may not be negative.');
            isValid = false;
        }
        const pattern = /^([a-zA-Z]+)(,[a-zA-Z]+)*$/;
        if (!categories || categories.length === 0) {
            setCategoriesError('Categories are required.');
            isValid = false;
        } else if (!pattern.test(categories)) {
            setCategoriesError(
                'Categories must be seperated by commas without spacing in between.'
            );
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
            setSizesError(
                'All sizes must be XS or S or M or L or XL seperated by commas without spacing in between.'
            );
            isValid = false;
        }
        if (!colors || colors.length === 0) {
            setColorsError('Colors are required.');
            isValid = false;
        } else if (!pattern.test(colors)) {
            setColorsError('Colors must be seperated by commas without spacing in between.');
            isValid = false;
        }
        return isValid;
    };

    const cleanData = (data: string[]) => {
        return Array.from(new Set(data.filter((item) => item.trim() !== '')));
    };

    const handleUpdateProduct = async (request: Product) => {
        const response = await ProductService.updateProduct(id, request);
        if (response.ok) {
            const product = await response.json();
            setStatusMessages([
                {
                    message: 'Updated product: ' + product.name,
                    type: 'success',
                },
            ]);
            setTimeout(onSave, 1000);
        } else {
            const error = await response.json();
            setStatusMessages([
                {
                    message: 'Failed to update product: ' + error.message,
                    type: 'error',
                },
            ]);
        }
    };

    const handleCreateProduct = async (request: Product) => {
        const response = await ProductService.createProduct(request);
        if (response.ok) {
            const product = await response.json();
            setStatusMessages([
                {
                    message: 'Created product: ' + product.name,
                    type: 'success',
                },
            ]);
            setTimeout(onSave, 1000);
        } else {
            const error = await response.json();
            setStatusMessages([
                {
                    message: 'Failed to create product: ' + error.message,
                    type: 'error',
                },
            ]);
        }
    };

    const handleSave = async (event: FormEvent) => {
        event.preventDefault();

        clearErrors();
        const cleanedSizes = cleanData(sizes);

        if (!validate(cleanedSizes)) {
            return;
        }
        const request: Product = {
            //   id: product.id,
            name,
            price: price,
            stock: stock,
            categories: stringToList(categories),
            description,
            images: ['unimplemented'],
            sizes: cleanedSizes,
            colors: stringToList(colors),
        };

        if (updatingProduct) {
            handleUpdateProduct(request);
        } else {
            handleCreateProduct(request);
        }
    };

    useEffect(() => {
        if (productToUpdate) {
            setId(productToUpdate.id!.toString());
            setName(productToUpdate.name);
            setPrice(productToUpdate.price);
            setStock(productToUpdate.stock);
            setCategories(productToUpdate.categories.join(','));
            setDescription(productToUpdate.description);
            //   setImages(productToUpdate.images)
            setSizes(productToUpdate.sizes);
            setColors(productToUpdate.colors.join(','));
            setUpdatingProduct(true);
        } else {
            setId('none');
            setName('');
            setPrice(0);
            setStock(0);
            setCategories('');
            setDescription('');
            // setImages([])
            setSizes([]);
            setColors('');
            setUpdatingProduct(false);
        }
        clearErrors();
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-screen-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    &#x2715;
                </button>

                {!updatingProduct && <h2 className="text-2xl font-bold mb-6">Create product</h2>}
                {updatingProduct && <h2 className="text-2xl font-bold mb-6">Update product</h2>}
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
                                onChange={(e) => setPrice(Number(e.target.value))}
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
                                onChange={(e) => setStock(Number(e.target.value))}
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
                                value={categories}
                                onChange={(e) => setCategories(e.target.value)}
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
                                value={colors}
                                onChange={(e) => setColors(e.target.value)}
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
                        {statusMessages && (
                            <div className="row">
                                <ul className="list-none mb-3 mx-auto">
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
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductEditor;
