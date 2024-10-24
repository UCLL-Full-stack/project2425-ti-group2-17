"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(product) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.stock = product.stock;
        this.category = product.category;
        this.description = product.description;
        this.images = product.images;
        this.sizes = product.sizes;
        this.colors = product.colors;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getPrice() {
        return this.price;
    }
    getStock() {
        return this.stock;
    }
    getCategory() {
        return this.category;
    }
    getDescription() {
        return this.description;
    }
    getImages() {
        return this.images;
    }
    getSizes() {
        return this.sizes;
    }
    getColors() {
        return this.colors;
    }
    updateStock(quantity) {
        if (quantity > 0 && this.stock - quantity < 0) {
            throw new Error('Not enough stock available');
        }
        this.stock -= quantity;
    }
    addStock(quantity) {
        if (quantity <= 0) {
            throw new Error('Invalid quantity to add');
        }
        this.stock += quantity;
    }
}
exports.Product = Product;
