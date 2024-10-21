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

    addItem(product: Product, quantity: number) {
        const cartItem = new CartItem({ cart: this, product, quantity });
        this.products.push(cartItem);
    }
}
