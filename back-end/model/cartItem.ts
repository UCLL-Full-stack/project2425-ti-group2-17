import { Cart } from './cart';
import { Product } from './product';

export class CartItem {
    private id?: number;
    // private cart: Cart;
    private product: Product;
    private quantity: number;

    constructor(cartItem: { product: Product; quantity: number; id?: number }) {
        // constructor(cartItem: { cart: Cart; product: Product; quantity: number; id?: number }) {

        this.validate(cartItem);
        this.id = cartItem.id;
        // this.cart = cartItem.cart;
        this.product = cartItem.product;
        this.quantity = cartItem.quantity;
    }

    getId(): number | undefined {
        return this.id;
    }

    // getCart(): Cart {
    //     return this.cart;
    // }

    getProduct(): Product {
        return this.product;
    }

    getQuantity(): number {
        return this.quantity;
    }

    // validate(cartItem: { cart: Cart; product: Product; quantity: number }) {
    validate(cartItem: { product: Product; quantity: number }) {
        // if (!cartItem.cart) {
        //     throw new Error('Cart cannot be null or undefined.');
        // }

        if (!cartItem.product) {
            throw new Error('Product cannot be null or undefined.');
        }

        if (cartItem.quantity <= 0) {
            throw new Error('Quantity must be greater than zero.');
        }
    }

    updateQuantity(newQuantity: number): void {
        if (newQuantity <= 0) {
            throw new Error('Quantity must be greater than zero.');
        }

        const quantityDifference = newQuantity - this.quantity;

        if (quantityDifference > 0 && this.product.getStock() < quantityDifference) {
            throw new Error('Not enough stock available to update the quantity.');
        }

        this.product.updateStock(-quantityDifference);
        this.quantity = newQuantity;
    }
}
