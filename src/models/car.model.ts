export class Car {
    id?: number;
    productName?: string;
    price?: string;
    category_id?: number;

    constructor({ id, productName, price, category_id }) {
        if (id !== undefined) {
            this.id = id;
        }
        if (productName !== undefined) {
            this.productName = productName;
        }
        if (price !== undefined) {
            this.price = price;
        }
        if (category_id !== undefined) {
            this.category_id = category_id;
        }
    }
}