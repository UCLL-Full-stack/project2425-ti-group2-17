import { Cart } from '../model/cart';
import { Customer } from '../model/customer';
import { CartItem } from '../model/cartItem';
import { Product } from '../model/product';

const product1 = new Product({
    name: 'T-Shirt',
    price: 20.0,
    stock: 100,
    category: ['Clothing'],
    description: 'A comfortable cotton T-shirt',
    images: ['image1.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Blue', 'Green'],
    id: 1,
});

const product2 = new Product({
    name: 'Sneakers',
    price: 50.0,
    stock: 50,
    category: ['Footwear'],
    description: 'Stylish and comfortable sneakers',
    images: ['image2.jpg'],
    sizes: ['M', 'L'],
    colors: ['Black', 'White'],
    id: 2,
});

const product3 = new Product({
    name: 'Jeans',
    price: 40.0,
    stock: 80,
    category: ['Clothing'],
    description: 'Classic blue jeans',
    images: ['image3.jpg'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Blue'],
    id: 3,
});

const customers: Customer[] = [
    new Customer({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        recentOrders: [],
        wishlist: [],
        id: 1,
    }),
    new Customer({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'password456',
        recentOrders: [],
        wishlist: [],
        id: 2,
    }),
    new Customer({
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        password: 'password789',
        recentOrders: [],
        wishlist: [],
        id: 3,
    }),
];

const carts: Cart[] = [];

const cartJohn = new Cart({
    customer: customers[0],
    products: [
        new CartItem({ product: product1, quantity: 2 }),
        new CartItem({ product: product2, quantity: 1 }),
    ],
    id: 1,
});
carts.push(cartJohn);

const cartJane = new Cart({
    customer: customers[1],
    products: [
        new CartItem({ product: product1, quantity: 1 }),
        new CartItem({ product: product3, quantity: 2 }),
    ],
    id: 2,
});
carts.push(cartJane);

const cartAlice = new Cart({
    customer: customers[2],
    products: [
        new CartItem({ product: product2, quantity: 2 }),
        new CartItem({ product: product3, quantity: 1 }),
    ],
    id: 3,
});
carts.push(cartAlice);

const getCarts = (): Cart[] => carts;

const getCartById = ({ id }: { id: number }): Cart | null => {
    return carts.find((cart) => cart.getId() === id) || null;
};

const getCartByCustomerEmail = ({ email }: { email: string }): Cart | null => {
    return carts.find((cart) => cart.getCustomer().getEmail() === email) || null;
};

const getCartByCustomerId = ({ id }: { id: number }): Cart | null => {
    return carts.find((cart) => cart.getCustomer().getId() === id) || null;
};

const createCart = (customer: Customer): Cart => {
    const cart = new Cart({ customer, products: [] });
    carts.push(cart);
    return cart;
};

const deleteCart = ({ id }: { id: number }) => {
    const cartIndex = carts.findIndex((cart) => cart.getId() === id);

    carts.splice(cartIndex, 1);
    return 'Cart successfully deleted.';
};

const addCartItem = (cartId: number, product: Product, quantity: number): CartItem => {
    const cart = getCartById({ id: cartId })!;
    const cartItem = cart.addItem(product, quantity);
    return cartItem;
};

export default {
    getCarts,
    getCartById,
    createCart,
    getCartByCustomerEmail,
    getCartByCustomerId,
    deleteCart,
    addCartItem,
};
