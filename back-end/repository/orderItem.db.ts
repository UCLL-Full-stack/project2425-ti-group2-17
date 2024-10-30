import { OrderItem } from '../model/orderItem';
import { Product } from '../model/product';

const product1 = new Product({
    name: 'T-Shirt',
    price: 20.0,
    stock: 100,
    category: ['Clothing'],
    description: 'A comfortable cotton T-shirt',
    images: ['tshirt1.jpg'],
    sizes: ['S', 'M', 'L'],
    colors: ['Blue', 'White'],
});

const product2 = new Product({
    name: 'Sneakers',
    price: 50.0,
    stock: 50,
    category: ['Footwear'],
    description: 'Stylish and comfortable sneakers',
    images: ['sneaker1.jpg'],
    sizes: ['M', 'L'],
    colors: ['Black', 'Red'],
});

const orderItems: OrderItem[] = [
    new OrderItem({ product: product1, quantity: 2 }),
    new OrderItem({ product: product2, quantity: 1 }),
];

const addOrderItem = (orderItem: OrderItem): OrderItem => {
    orderItems.push(orderItem);
    return orderItem;
};

export default {
    addOrderItem,
};
