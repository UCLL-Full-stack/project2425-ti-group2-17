import { Customer } from '../model/customer';
import { Order } from '../model/order';
import { OrderItem } from '../model/orderItem';
import { Payment } from '../model/payment';
import { Product } from '../model/product';

const product1 = new Product({
    id: 1,
    name: 'Classic T-Shirt',
    price: 19.99,
    stock: 200,
    category: ['Clothing', 'Men'],
    description: 'Comfortable cotton T-Shirt.',
    images: ['tshirt_front.jpg', 'tshirt_back.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Blue', 'Black'],
});

const product2 = new Product({
    id: 2,
    name: 'Leather Jacket',
    price: 199.99,
    stock: 50,
    category: ['Clothing', 'Outerwear'],
    description: 'Stylish genuine leather jacket.',
    images: ['jacket_front.jpg', 'jacket_back.jpg'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Black'],
});

const customer = new Customer({
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    password: 'securepassword123',
    recentOrders: [],
    wishlist: [],
    id: 1,
});

const orderItem1 = new OrderItem({
    product: product1,
    quantity: 2,
    id: 1,
});

const orderItem2 = new OrderItem({
    product: product2,
    quantity: 1,
    id: 2,
});

const totalAmount =
    orderItem1.getProduct().getPrice() * orderItem1.getQuantity() +
    orderItem2.getProduct().getPrice() * orderItem2.getQuantity();

const payment = new Payment({
    amount: totalAmount,
    date: new Date(),
    paymentStatus: 'paid',
    id: 1,
});

const order1 = new Order({
    customer: customer,
    items: [orderItem1, orderItem2],
    date: new Date(),
    payment: payment,
    id: 1,
});

const orderItem3 = new OrderItem({
    product: product1,
    quantity: 3,
    id: 3,
});

const totalAmount2 = orderItem3.getProduct().getPrice() * orderItem3.getQuantity();

const payment2 = new Payment({
    amount: totalAmount2,
    date: new Date(),
    paymentStatus: 'unpaid',
    id: 2,
});

const order2 = new Order({
    customer: customer,
    items: [orderItem3],
    date: new Date(),
    payment: payment2,
    id: 2,
});

const orders: Order[] = [];
orders.push(order1);
orders.push(order2);

console.log(orders);
