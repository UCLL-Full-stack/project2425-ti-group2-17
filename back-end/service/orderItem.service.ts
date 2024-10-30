import { OrderItem } from '../model/orderItem';
import { Product } from '../model/product';
import orderItemDb from '../repository/orderItem.db';
import { OrderItemInput } from '../types/index';

// const addOrderItem = ({ product, quantity }: OrderItemInput): OrderItem => {
//     const existingProduct = productDb.getProductById(product.id);
//     if (!existingProduct) {
//         throw new Error(`Product with id ${product.id} does not exist.`);
//     }

//     const newOrderItem = new OrderItem({ product: existingProduct, quantity });
//     return orderItemDb.addOrderItem(newOrderItem);
// };

const addOrderItem = ({ product, quantity }: OrderItemInput): OrderItem => {
    const newProduct = new Product(product);
    const newOrderItem = new OrderItem({ product: newProduct, quantity });
    return orderItemDb.addOrderItem(newOrderItem);
};

export default {
    addOrderItem,
};
