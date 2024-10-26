export class Brand {
    id?: number;
    categoryId?: number;
    brandName?: string;
    brandDescription?: string;

    constructor({ id, categoryId, brandName, brandDescription }) {
        if (id !== null) {
            this.id = id;
        }
        if (categoryId !== null) {
            this.categoryId = categoryId;
        }
        if (brandName !== null) {
            this.brandName = brandName;
        }
        if (brandDescription !== null) {
            this.brandDescription = brandDescription;
        }
    }
}