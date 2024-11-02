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
            this.products[existingProductIndex].increaseQuantity(existingQuantity + quantity);
            return this.products[existingProductIndex];
        } else {
            const cartItem = new CartItem({ product, quantity });
            this.products.push(cartItem);
            return cartItem;
        }
    }
    removeItem(product: Product, quantity: number): CartItem | string {
        if (quantity <= 0) throw new Error('Quantity must be greater than zero.');

        const existingProductIndex = this.products.findIndex(
            (item) => item.getProduct().getId() === product.getId()
        );

        if (existingProductIndex === -1) throw new Error('Product not in cart.');

        const existingQuantity = this.products[existingProductIndex].getQuantity();
        if (existingQuantity < quantity)
            throw new Error('There are not that many products in the cart to remove.');
        this.products[existingProductIndex].decreaseQuantity(existingQuantity - quantity);

        if (this.products[existingProductIndex].getQuantity() === 0) {
            this.products.splice(existingProductIndex, 1);
            return 'Item removed from cart.';
        } else {
            return this.products[existingProductIndex];
        }
    }
    emptyCart() {
        this.products = [];
    }
}
