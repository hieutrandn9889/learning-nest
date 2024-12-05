export class Color {
    id?: number;
    colorName?: string;
    colorDescription?: string;
    car_id?: number;

    constructor({ id, colorName, colorDescription, car_id }) {
        if (id !== undefined) {
            this.id = id;
        }
        if (colorName !== undefined) {
            this.colorName = colorName;
        }
        if (colorDescription !== undefined) {
            this.colorDescription = colorDescription;
        }
        if (car_id !== undefined) {
            this.car_id = car_id;
        }
    }
}