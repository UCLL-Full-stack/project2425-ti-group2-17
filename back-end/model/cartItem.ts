import { Cart } from './cart';
import { Product } from './product';

export class CartItem {
    private id?: number;
    private product: Product;
    private quantity: number;

    constructor(cartItem: { product: Product; quantity: number; id?: number }) {
        this.validate(cartItem);
        this.id = cartItem.id;
        this.product = cartItem.product;
        this.quantity = cartItem.quantity;
    }

    getId(): number | undefined {
        return this.id;
    }

    getProduct(): Product {
        return this.product;
    }

    getQuantity(): number {
        return this.quantity;
    }

    validate(cartItem: { product: Product; quantity: number }) {
        if (!cartItem.product) {
            throw new Error('Product cannot be null or undefined.');
        }

        if (cartItem.quantity <= 0) {
            throw new Error('Quantity must be greater than zero.');
        }
    }

    increaseQuantity(newQuantity: number): void {
        if (newQuantity <= 0) {
            throw new Error('Quantity must be greater than zero.');
        }

        const quantityDifference = newQuantity - this.quantity;

        if (quantityDifference > 0 && this.product.getStock() < newQuantity) {
            throw new Error('Not enough stock available to update the quantity.');
        }

        this.quantity = newQuantity;
    }

    decreaseQuantity(newQuantity: number): void {
        this.quantity = newQuantity;
    }
}
