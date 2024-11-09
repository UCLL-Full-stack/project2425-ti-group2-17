import { CartItem } from './cartItem';
import { Customer } from './customer';
import { Product } from './product';
import {
    Customer as CustomerPrisma,
    Product as ProductPrisma,
    CartItem as CartItemPrisma,
    Cart as CartPrisma,
} from '@prisma/client';

export class Cart {
    private id?: number;
    private customer: Customer;
    private products: CartItem[];
    // private totalAmount: number;

    constructor(cart: { customer: Customer; products: CartItem[]; id?: number }) {
        this.validate(cart);
        this.id = cart.id;
        this.customer = cart.customer;
        this.products = cart.products;
        // this.totalAmount = this.calculateTotalAmount();
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

    getTotalAmount() {
        return this.products.reduce((total, item) => total + item.getTotalPrice(), 0);
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
            // this.calculateTotalAmount();
            return this.products[existingProductIndex];
        } else {
            const cartItem = new CartItem({ product, quantity });
            this.products.push(cartItem);
            // this.calculateTotalAmount();
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
            // this.calculateTotalAmount();
            return 'Item removed from cart.';
        } else {
            // this.calculateTotalAmount();
            return this.products[existingProductIndex];
        }
    }
    emptyCart() {
        this.products = [];
    }

    // calculateTotalAmount() {
    //     this.totalAmount = this.products.reduce((total, item) => total + item.getTotalPrice(), 0);
    //     return this.totalAmount;
    // }

    // static from({
    //     id,
    //     customer,
    //     products,
    // }: CartPrisma & { Customer: CustomerPrisma; products: CartItemPrisma[] }) {
    //     return new Cart({
    //         id,
    //         customer: Customer.from(customer),
    //         products: products.map((product: CartItemPrisma) => CartItem.from(product)),
    //     });
    // }
}

// }: CartPrisma & { Customer: CustomerPrisma; products: (CartItemPrisma & { Product: ProductPrisma })[] }) {
//     }: CartPrisma & { Customer: CustomerPrisma; products: CartItemPrisma[] }) {

// // private totalAmount: number;
