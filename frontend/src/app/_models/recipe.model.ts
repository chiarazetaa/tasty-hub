import { Ingredient } from "./ingredient.model";

export class Recipe {
    _id: any; 
    name: string;
    description: string;
    ingredients: Ingredient[];
    instructions: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: any,
        name: string,
        description: string,
        ingredients: Ingredient[],
        instructions: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

