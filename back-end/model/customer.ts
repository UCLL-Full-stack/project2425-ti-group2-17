import { Order } from './order';
import { Product } from './product';
import { User } from './user';

export class Customer extends User {
    private wishlist: Product[];

    constructor(customer: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        wishlist: Product[];
        id?: number;
    }) {
        super(customer);
        this.wishlist = customer.wishlist;
    }

    getWishlist(): Product[] {
        return this.wishlist;
    }

    addProductToWishlist(product: Product) {
        if (this.wishlist.includes(product)) {
            throw new Error('Product is already in the wishlist.');
        }

        this.wishlist.push(product);
        return product;
    }

    removeProductFromWishlist(product: Product) {
        const productIndex = this.wishlist.indexOf(product);

        if (productIndex === -1) {
            throw new Error('Product is not in the wishlist.');
        }

        this.wishlist = this.wishlist.filter((item) => item !== product);
        return 'Product removed from wishlist.';
    }
}
