import { ObjectId } from 'mongodb';

export interface Recipe {
    _id?: ObjectId;
    name: string;
    description: string;
    ingredients: Ingredient[];
    instructions: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Ingredient {
    _id?: ObjectId;
    name: string;
    quantity: string;
}

export interface GetRecipesResponse {
    recipes: Recipe[];
    totalPages: number;
    currentPage: number;
}