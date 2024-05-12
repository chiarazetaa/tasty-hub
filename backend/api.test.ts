import { app } from './app';
import { describe, test, expect } from "@jest/globals";
const { ObjectId } = require('mongodb');
const { database } = require('./db');

describe('API Endpoints', () => {
    let db: any;

    beforeAll(async () => {
        db = await database();
    });

    test('GET /api/recipes should return recipes list', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/recipes',
            query: { page: 1 }
        });
        expect(response.statusCode).toBe(200);
        expect(response.json().recipes).toBeDefined();
        expect(response.json().totalPages).toBeDefined();
        expect(response.json().currentPage).toBeDefined();
    });

    // test('POST /api/recipes should create a new recipe', async () => {
    //     const newRecipe = {
    //         _id: new ObjectId(),
    //         name: "Recipe Test",
    //         description: "This is a Recipe Test.",
    //         ingredients: [
    //             { _id: new ObjectId(), name: "Ingredient test", quantity: "A lot" }
    //         ],
    //         instructions: "Testing...",
    //         createdAt: new Date(),
    //         updatedAt: new Date()
    //     };

    //     const response = await app.inject({
    //         method: 'POST',
    //         url: '/api/recipes',
    //         payload: newRecipe
    //     });
    //     console.log(response);

    //     expect(response.statusCode).toBe(200);
    //     expect(response.json()).toHaveProperty('newRecipeId');
    // });

    test('GET /api/recipes/:id should return a specific recipe', async () => {
        const recipeId = new ObjectId('6640feff3799a89ddbd69b24');

        const response = await app.inject({
            method: 'GET',
            url: `/api/recipes/${recipeId}`
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toBeDefined();
    });

    test('PUT /api/recipes/:id should update a specific recipe', async () => {
        const recipeId = new ObjectId('6640feff3799a89ddbd69b24');
        const updatedRecipe = {
            name: "Recipe Test",
            description: "This is a Recipe Test.",
            ingredients: [
                { _id: new ObjectId(), name: "Ingredient test", quantity: "A lot" }
            ],
            instructions: "Testing...done!",
            updatedAt: new Date()
        };

        const response = await app.inject({
            method: 'PUT',
            url: `/api/recipes/${recipeId}`,
            payload: updatedRecipe
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toHaveProperty('message', 'Recipe updated successfully');
    });

    // test('DELETE /api/recipes/:id', async () => {
    //     const recipeId = new ObjectId('664103301a519ba597f5a5f2');

    //     const response = await app.inject({
    //         method: 'DELETE',
    //         url: `/api/recipes/${recipeId}`
    //     });

    //     expect(response.statusCode).toBe(200);
    //     expect(response.json()).toHaveProperty('message', 'Recipe deleted successfully');
    // });

    test('POST /api/recipes/:id/ingredients', async () => {
        const recipeId = new ObjectId('6640feff3799a89ddbd69b24'); // Assuming you have a recipe in the database
        const newIngredient = {
            _id: new ObjectId(),
            name: 'ingredient',
            quantity: 'some'
        };

        const response = await app.inject({
            method: 'POST',
            url: `/api/recipes/${recipeId}/ingredients`,
            payload: { ingredient: newIngredient }
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toHaveProperty('message', 'Ingredient added to recipe successfully');
    });

});