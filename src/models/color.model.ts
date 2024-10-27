export class Color {
    id?: number;
    colorName?: string;
    colorDescription?: string;
    category_id?: number;

    constructor({ id, colorName, colorDescription, category_id }) {
        if (id !== undefined) {
            this.id = id;
        }
        if (colorName !== undefined) {
            this.colorName = colorName;
        }
        if (colorDescription !== undefined) {
            this.colorDescription = colorDescription;
        }
        if (category_id !== undefined) {
            this.category_id = category_id;
        }
    }
}