export class Product {
    id?: number;
    categoryId?: number;
    productName?: string;
    price?: number;
    description?: string;

    constructor({ id, categoryId, productName, price, description }) {
        if (id !== null) {
            this.id = id;
        }
        if (categoryId !== null) {
            this.categoryId = categoryId;
        }
        if (productName !== null) {
            this.productName = productName;
        }
        if (price !== null) {
            this.price = price;
        }
        if (description !== undefined)
            this.description = description;
        }
}