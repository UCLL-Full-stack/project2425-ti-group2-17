import { Product } from '../../model/product';

test('given: valid values for product, when: product is created, then: product is created with those values', () => {
    const tShirt = new Product({
        name: 'T-Shirt',
        price: 30.0,
        stock: 100,
        category: ['Clothing', 'Men', 'Tops'],
        description: 'A comfortable cotton t-shirt',
        images: ['image1.jpg', 'image2.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Green'],
    });

    expect(tShirt.getName()).toEqual('T-Shirt');
    expect(tShirt.getPrice()).toEqual(30.0);
    expect(tShirt.getStock()).toEqual(100);
    expect(tShirt.getCategory()).toEqual(['Clothing', 'Men', 'Tops']);
    expect(tShirt.getDescription()).toEqual('A comfortable cotton t-shirt');
    expect(tShirt.getImages()).toEqual(['image1.jpg', 'image2.jpg']);
    expect(tShirt.getSizes()).toEqual(['S', 'M', 'L', 'XL']);
    expect(tShirt.getColors()).toEqual(['Black', 'White', 'Green']);
});
