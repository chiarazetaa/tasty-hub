import { RouteShorthandOptions } from 'fastify';

const recipeListOptions: RouteShorthandOptions = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                page: { type: 'integer' }
            },
            required: ['page']
        }
    }
};

const createRecipeOptions: RouteShorthandOptions = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                ingredients: { type: 'array' },
                instructions: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                upupdatedAt: { type: 'string', format: 'date-time' }
            },
            required: ['name', 'description', 'ingredients', 'instructions']
        }
    }
};

const getRecipeOptions: RouteShorthandOptions = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'string' }
            },
            required: ['id']
        }
    }
};

const updateRecipeOptions: RouteShorthandOptions = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'string' }
            },
            required: ['id']
        },
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                ingredients: { type: 'array' },
                instructions: { type: 'string' }
            },
            required: ['name', 'description', 'ingredients', 'instructions']
        }
    }
};

const deleteRecipeOptions: RouteShorthandOptions = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'string' }
            },
            required: ['id']
        }
    }
};

const addIngredientOptions: RouteShorthandOptions = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'string' }
            },
            required: ['id']
        },
        body: {
            type: 'object',
            properties: {
                ingredient: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        quantity: { type: 'string' }
                    },
                    required: ['name', 'quantity']
                }
            },
            required: ['ingredient']
        }
    }
};

const updateIngredientOptions: RouteShorthandOptions = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                ingredientId: { type: 'string' }
            },
            required: ['id', 'ingredientId']
        },
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                quantity: { type: 'string' }
            },
            required: ['name', 'quantity']
        }
    }
};

const removeIngredientOptions: RouteShorthandOptions = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                ingredientId: { type: 'string' }
            },
            required: ['id', 'ingredientId']
        }
    }
};

module.exports = {
    opts: {
        recipeListOptions: recipeListOptions,
        createRecipeOptions: createRecipeOptions,
        getRecipeOptions: getRecipeOptions,
        updateRecipeOptions: updateRecipeOptions,
        deleteRecipeOptions: deleteRecipeOptions,
        addIngredientOptions: addIngredientOptions,
        updateIngredientOptions: updateIngredientOptions,
        removeIngredientOptions: removeIngredientOptions
    }
};