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
}
