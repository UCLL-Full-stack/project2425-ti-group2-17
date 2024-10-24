import { CartItem } from './cartItem';
import { Customer } from './customer';
import { Product } from './product';

export class Cart {
    private id?: number;
    private customer: Customer;
    private products: CartItem[];

    constructor(cart: { customer: Customer; products: CartItem[]; id?: number }) {
        this.id = cart.id;
        this.customer = cart.customer;
        this.products = cart.products;
    }

    getId(): number | undefined {
        return this.id;
    }

    getCustomer(): Customer {
        return this.customer;
    }

    getProducts(): CartItem[] {
        return this.products;
    }

    validate(cart: { customer: Customer; products: CartItem[] }) {
        if (!cart.customer) throw new Error('Customer cannot be null or undefined.');

        if (!Array.isArray(cart.products) || cart.products.length === 0)
            throw new Error('Cart must have at least one product.');
    }

    addItem(product: Product, quantity: number) {
        if (quantity <= 0) throw new Error('Quantity must be greater than zero.');

        const existingProductIndex = this.products.findIndex(
            (item) => item.getProduct().id === product.id
        );
        if (existingProductIndex !== -1) {
            this.products[existingProductIndex].updateQuantity(quantity);
        } else {
            const cartItem = new CartItem({ cart: this, product, quantity });
            this.products.push(cartItem);
        }
    }
}
