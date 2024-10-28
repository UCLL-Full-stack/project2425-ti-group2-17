import { Cart } from '../../model/cart';
import { CartItem } from '../../model/cartItem';
import { Customer } from '../../model/customer';
import { Product } from '../../model/product';
import cartDb from '../../repository/cart.db';
import cartService from '../../service/cart.service';

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
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bob.smith@example.com',
        password: 'password789',
        recentOrders: [],
        wishlist: [],
        id: 2,
    }),
];
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

const carts: Cart[] = [];

const cartJohn = new Cart({
    customer: customers[0],
    products: [new CartItem({ product: product1, quantity: 2 })],
    id: 1,
});
carts.push(cartJohn);

const cartJane = new Cart({
    customer: customers[1],
    products: [new CartItem({ product: product2, quantity: 1 })],
    id: 2,
});
carts.push(cartJane);

let mockCartDbGetCarts: jest.Mock;
let mockCartDbGetCartById: jest.Mock;
let mockCartDbCreateCart: jest.Mock;
let mockCartDbDeleteCart: jest.Mock;
let mockCartDbGetCartByCustomerEmail: jest.Mock;
let mockCartDbGetCartByCustomerId: jest.Mock;

beforeEach(() => {
    mockCartDbGetCarts = jest.fn();
    mockCartDbGetCartById = jest.fn();
    mockCartDbCreateCart = jest.fn();
    mockCartDbDeleteCart = jest.fn();
    mockCartDbGetCartByCustomerEmail = jest.fn();
    mockCartDbGetCartByCustomerId = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given carts in the DB, when getting all carts, then all carts are returned', () => {
    cartDb.getCarts = mockCartDbGetCarts.mockReturnValue(carts);

    const result = cartService.getCarts();

    expect(result).toEqual(carts);
    expect(mockCartDbGetCarts).toHaveBeenCalled();
});

test('given carts in the DB, when getting cart by id, then that cart is returned', () => {
    cartDb.getCartById = mockCartDbGetCartById.mockReturnValue(carts[0]);

    const result = cartService.getCartById(1);

    expect(result).toEqual(carts[0]);
    expect(mockCartDbGetCartById).toHaveBeenCalledWith({ id: 1 });
});

test('given carts in the DB, when getting a cart by incorrect id, then an error is thrown', () => {
    cartDb.getCartById = mockCartDbGetCartById.mockReturnValue(null);

    const getCartById = () => cartService.getCartById(3);

    expect(getCartById).toThrow('Cart with id 3 does not exist.');
    expect(mockCartDbGetCartById).toHaveBeenCalledWith({ id: 3 });
});

// test('given a new customer, when creating a cart, then the cart is created successfully', () => {
//     cartDb.getCartByCustomerEmail = mockCartDbGetCartByCustomerEmail.mockReturnValue(null);

//     const createdCart = new Cart({ customer: customers[2], products: [] });
//     cartDb.createCart = mockCartDbCreateCart.mockReturnValue(createdCart);

//     const result = cartService.createCart(customers[2]);

//     expect(result).toEqual(createdCart);
//     expect(mockCartDbCreateCart).toHaveBeenCalledWith(customers[2]);
// });

// test('given an existing customer with a cart, when creating a cart, then an error is thrown', () => {
//     cartDb.getCartByCustomerEmail = mockCartDbGetCartByCustomerEmail.mockReturnValue(
//         new Cart({ customer: customers[0], products: [] })
//     );

//     const createCartFunction = () => cartService.createCart(customers[0]);

//     expect(createCartFunction).toThrow('This customer already has a cart.');
//     expect(mockCartDbGetCartByCustomerEmail).toHaveBeenCalledWith({
//         email: customers[0].getEmail(),
//     });
// });

// test('given a customer with a cart, when deleting the cart, then the cart is deleted successfully', () => {
//     cartDb.getCartByCustomerId = mockCartDbGetCartByCustomerId.mockReturnValue(carts[0]);

//     cartDb.deleteCart = mockCartDbDeleteCart.mockReturnValue('Cart successfully deleted.');

//     const result = cartService.deleteCart(1);

//     expect(result).toEqual('Cart successfully deleted.');
//     expect(mockCartDbDeleteCart).toHaveBeenCalledWith({ id: 1 });
// });

// test('given a customer without a cart, when deleting the cart, then an error is thrown', () => {
//     cartDb.getCartByCustomerId = mockCartDbGetCartByCustomerId.mockReturnValue(null);

//     const deleteCartFunction = () => cartService.deleteCart(3);

//     expect(deleteCartFunction).toThrow('That customer does not have a cart.');
//     expect(mockCartDbGetCartByCustomerId).toHaveBeenCalledWith({ id: 3 });
// });
