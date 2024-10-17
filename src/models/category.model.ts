export class Category {
    id?: number;
    categoryName?: number;
    description?: string;

    constructor({ id, categoryName, description }) {
        if (id !== undefined) {
            this.id = id;
        }
        if (categoryName !== undefined) {
            this.categoryName = categoryName;
        }
        if (description !== undefined) {
            this.description = description;
        }
    }
}