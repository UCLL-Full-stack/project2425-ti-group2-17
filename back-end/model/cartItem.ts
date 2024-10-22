import { Cart } from './cart';
import { Product } from './product';

export class CartItem {
    private id?: number;
    private cart: Cart;
    private product: Product;
    private quantity: number;
    constructor(cartItem: { cart: Cart; product: Product; quantity: number; id?: number }) {
        this.id = cartItem.id;
        this.cart = cartItem.cart;
        this.product = cartItem.product;
        this.quantity = cartItem.quantity;
    }
    getId(): number | undefined {
        return this.id;
    }

    getCart(): Cart {
        return this.cart;
    }

    getProduct(): Product {
        return this.product;
    }

    getQuantity(): number {
        return this.quantity;
    }
}