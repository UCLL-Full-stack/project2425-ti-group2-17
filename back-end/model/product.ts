export class Product {
    private id?: number;
    private name: string;
    private price: number;
    private stock: number;
    private category: string[];
    private description: string;
    private images: string[];
    private sizes: string[];
    private colors: string[];

    constructor(product: {
        name: string;
        price: number;
        stock: number;
        category: string[];
        description: string;
        images: string[];
        sizes: string[];
        colors: string[];
        id?: number;
    }) {
        this.validate(product);
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.stock = product.stock;
        this.category = product.category;
        this.description = product.description;
        this.images = product.images;
        this.sizes = product.sizes;
        this.colors = product.colors;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getStock(): number {
        return this.stock;
    }

    getCategory(): string[] {
        return this.category;
    }

    getDescription(): string {
        return this.description;
    }

    getImages(): string[] {
        return this.images;
    }

    getSizes(): string[] {
        return this.sizes;
    }

    getColors(): string[] {
        return this.colors;
    }

    validate(product: {
        name: string;
        price: number;
        stock: number;
        category: string[];
        description: string;
        images: string[];
        sizes: string[];
        colors: string[];
    }) {
        console.log('Validating product:', product);
        if (!product.name.trim()) throw new Error('The product name is required.');
        if (product.name.length < 2 || product.name.length > 50)
            throw new Error('The product name must be between 2 and 50 characters.');
        if (product.price <= 0) {
            throw new Error('Price must be greater than zero.');
        }
        if (product.stock < 0) {
            throw new Error('Stock must be positive.');
        }
        if (product.category.length === 0) {
            throw new Error('Product must belong to at least one category.');
        }
        if (!product.description.trim()) throw new Error('The product description is required.');
        if (product.images.length === 0) {
            throw new Error('Product must have at least one image.');
        }
        if (product.sizes.length === 0) {
            throw new Error('Product must be available in at least one size.');
        }
        if (
            !product.sizes.every(
                (size) =>
                    size === 'XS' || size === 'S' || size === 'M' || size === 'L' || size === 'XL'
            )
        ) {
            throw new Error('All sizes must be "XS" or "S" or "M" or "L" or "XL".');
        }

        if (product.colors.length === 0) {
            throw new Error('Product must be available in at least one color.');
        }
    }

    updateStock(quantityChange: number): void {
        const newStock = this.stock + quantityChange;
        if (newStock < 0) {
            throw new Error('Not enough stock available');
        }
        this.stock = newStock;
    }

    addStock(quantity: number): void {
        if (quantity <= 0) {
            throw new Error('Invalid quantity to add');
        }
        this.stock += quantity;
    }
}
