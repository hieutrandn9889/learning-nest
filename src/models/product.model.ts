export class Product {
    id?: number;
    categoryId?: number;
    productName?: string;
    price?: string;

    constructor({ id, categoryId, productName, price }) {
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
    }
}