import { CartItem } from './cartItem';
import { Customer } from './customer';
import { Product } from './product';

export class Cart {
    private id?: number;
    private customer: Customer;
    private products: CartItem[];

    constructor(cart: { customer: Customer; products: CartItem[]; id?: number }) {
        this.validate(cart);
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
        if (!cart.customer) {
            throw new Error('Customer cannot be null or undefined.');
        }
    }

    addItem(product: Product, quantity: number) {
        if (quantity <= 0) throw new Error('Quantity must be greater than zero.');

        const existingProductIndex = this.products.findIndex(
            (item) => item.getProduct().getId() === product.getId()
        );

        if (existingProductIndex !== -1) {
            const existingQuantity = this.products[existingProductIndex].getQuantity();
            this.products[existingProductIndex].updateQuantity(existingQuantity + quantity);
        } else {
            const cartItem = new CartItem({ product, quantity });
            this.products.push(cartItem);
        }
    }
}
