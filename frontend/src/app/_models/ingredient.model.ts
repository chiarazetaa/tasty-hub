export class Ingredient {
    _id: any;
    name: string;
    quantity: string;

    constructor(_id: any, name: string, quantity: string) {
        this._id = _id;
        this.name = name;
        this.quantity = quantity;
    }
}