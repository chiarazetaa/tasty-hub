const fastify = require('fastify');
const cors = require('@fastify/cors');
const { ObjectId } = require('mongodb');
const { database } = require('./db');

const app = fastify();
// enable CORS with specific origin
app.register(cors, {
    origin: 'http://localhost:4200',
});
const port = 3000;

// get recipes list
app.get('/api/recipes', async function (req: any, res: any) {
    try {
        let db = await database();
        let page = req.query.page || 1;
        let pageSize = 1;
        let skip = (page - 1) * pageSize;
        let recipes = await db.collection('recipes').find({}).skip(skip).limit(pageSize).toArray();

        let totalRecipes = await db.collection('recipes').countDocuments();

        let totalPages = Math.ceil(totalRecipes / pageSize);

        return {
            recipes,
            totalPages,
            currentPage: page
        };
    } catch (err) {
        console.error(err);
        return { error: 'Failed to fetch data from MongoDB' };
    }
});

// create a recipe
app.post('/api/recipes', async function (req: any, res: any) {
    try {
        let db = await database();
        let newRecipe = req.body;
        newRecipe.createdAt = new Date();
        newRecipe.updatedAt = new Date();
        let result = await db.collection('recipes').insertOne(newRecipe);
        return result.insertedId;
    } catch (err) {
        console.error(err);
        return { error: 'Failed to create recipe' };
    }
});

// get a recipe
app.get('/api/recipes/:id', async function (req: any, res: any) {
    try {
        let db = await database();
        let recipeId = new ObjectId(req.params.id);
        let result = await db.collection('recipes').findOne({ _id: recipeId });
        return result;
    } catch (err) {
        console.error(err);
        return { error: 'Failed to update recipe' };
    }
});

// update a recipe
app.put('/api/recipes/:id', async function (req: any, res: any) {
    try {
        let db = await database();
        let recipeId = new ObjectId(req.params.id);
        let updatedRecipe = req.body;
        updatedRecipe.updatedAt = new Date();
        let result = await db.collection('recipes').updateOne({ _id: recipeId }, { $set: updatedRecipe });
        if (result.modifiedCount === 0) {
            return { error: 'Recipe not found' };
        }
        return { message: 'Recipe updated successfully' };
    } catch (err) {
        console.error(err);
        return { error: 'Failed to update recipe' };
    }
});

// delete a recipe
app.delete('/api/recipes/:id', async function (req: any, res: any) {
    try {
        let db = await database();
        let recipeId = new ObjectId(req.params.id);
        let result = await db.collection('recipes').deleteOne({ _id: recipeId });
        if (result.deletedCount === 0) {
            return { error: 'Recipe not found' };
        }
        return { message: 'Recipe deleted successfully' };
    } catch (err) {
        console.error(err);
        return { error: 'Failed to delete recipe' };
    }
});

// add ingredient to recipe
app.post('/api/recipes/:id/ingredients', async function (req: any, res: any) {
    try {
        let db = await database();
        let recipeId = new ObjectId(req.params.id);
        let newIngredientId = new ObjectId();
        let { name, quantity } = req.body.ingredient;

        let recipe = await db.collection('recipes').findOne({ _id: recipeId });
        recipe.ingredients.push({
            _id: newIngredientId,
            name: name,
            quantity: quantity
        });
        
        let result = await db.collection('recipes').updateOne(
            { _id: recipeId },
            {$set: { 
                ingredients: recipe.ingredients,
                updatedAt: new Date()
            }}
        );

        if (result.modifiedCount === 0) {
            return { error: 'Recipe or ingredient not found' };
        }

        return { message: 'Ingredient added to recipe successfully' };
    } catch (err) {
        console.error(err);
        return { error: 'Failed to update ingredient from recipe' };
    }
});

// update ingredient of recipe
app.put('/api/recipes/:id/ingredients/:ingredientId', async function (req: any, res: any) {
    try {
        let db = await database();
        let recipeId = new ObjectId(req.params.id);
        let ingredientId = new ObjectId(req.params.ingredientId);
        let { name, quantity } = req.body;

        let recipe = await db.collection('recipes').findOne({ _id: recipeId, 'ingredients._id': ingredientId });
        
        let newIngredientArray = [];
        for (let ingredient of recipe.ingredients) {
            if (ingredient._id.toString() === ingredientId.toString()) {
                newIngredientArray.push({
                    _id: ingredientId,
                    name: name,
                    quantity: quantity
                });
            } else {
                newIngredientArray.push(ingredient);
            }
        }

        let result = await db.collection('recipes').updateOne(
            { _id: recipeId, 'ingredients._id': ingredientId },
            {$set: { 
                ingredients: newIngredientArray,
                updatedAt: new Date()
            }}
        );

        if (result.modifiedCount === 0) {
            return { error: 'Recipe or ingredient not found' };
        }

        return { message: 'Ingredient updated successfully' };
    } catch (err) {
        console.error(err);
        return { error: 'Failed to update ingredient from recipe' };
    }
});

// remove ingredient from recipe
app.delete('/api/recipes/:id/ingredients/:ingredientId', async function (req: any, res: any) {
    try {
        let db = await database();
        let recipeId = new ObjectId(req.params.id);
        let ingredientId = new ObjectId(req.params.ingredientId);

        let recipe = await db.collection('recipes').findOne({ _id: recipeId, 'ingredients._id': ingredientId });
        
        let newIngredientArray = [];
        for (let ingredient of recipe.ingredients) {
            if (ingredient._id.toString() !== ingredientId.toString()) {
                newIngredientArray.push(ingredient);
            }
        }

        let result = await db.collection('recipes').updateOne(
            { _id: recipeId, 'ingredients._id': ingredientId },
            {$set: { 
                ingredients: newIngredientArray,
                updatedAt: new Date()
            }}
        );
    
        if (result.modifiedCount === 0) {
            return { error: 'Recipe or ingredient not found' };
        }
        return { message: 'Ingredient removed from recipe successfully' };
    } catch (err) {
        console.error(err);
        return { error: 'Failed to remove ingredient from recipe' };
    }
});

// start the server
const start = async function () {
    try {
        await app.listen({ port: port });
        console.log('Server is running on http://localhost:3000');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
start(); 