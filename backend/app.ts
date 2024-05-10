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
        let pageSize = 10; // Imposta le dimensioni della pagina a 10 per esempio
        let skip = (page - 1) * pageSize;
        let recipes = await db.collection('recipes').find({}).skip(skip).limit(pageSize).toArray();
        return recipes;
    } catch (err) {
        console.error(err);
        return { error: 'Failed to fetch data from MongoDB' };
    }
});

// create a recipe
app.post('/api/recipes', async function (req: any, res: any) {
    try {
        let db = await database();
        let newRecipe = req.body; // Assicurati che la richiesta includa i dati della nuova ricetta
        let result = await db.collection('recipes').insertOne(newRecipe);
        return result.insertedId;
    } catch (err) {
        console.error(err);
        return { error: 'Failed to create recipe' };
    }
});

// update a recipe
app.put('/api/recipes/:id', async function (req: any, res: any) {
    try {
        let db = await database();
        let recipeId = req.params.id;
        let updatedRecipe = req.body; // Assicurati che la richiesta includa i dati aggiornati della ricetta
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
        console.log(new ObjectId(req.params.id));
        
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

// Endpoint per aggiungere un sotto-documento all'array di ingredienti di una ricetta
app.post('/api/recipes/:id/ingredients', async function (req: any, res: any) {
    try {
        let db = await database();
        let recipeId = req.params.id;
        let newIngredient = req.body.ingredient; // Assicurati che la richiesta includa il nuovo ingrediente
        let result = await db.collection('recipes').updateOne({ _id: recipeId }, { $push: { ingredients: newIngredient } });
        if (result.modifiedCount === 0) {
            return { error: 'Recipe not found' };
        }
        return { message: 'Ingredient added to recipe successfully' };
    } catch (err) {
        console.error(err);
        return { error: 'Failed to add ingredient to recipe' };
    }
});

// Endpoint per rimuovere un sotto-documento dall'array di ingredienti di una ricetta
app.delete('/api/recipes/:id/ingredients/:ingredientId', async function (req: any, res: any) {
    try {
        let db = await database();
        let recipeId = req.params.id;
        let ingredientId = req.params.ingredientId;
        let result = await db.collection('recipes').updateOne({ _id: recipeId }, { $pull: { ingredients: { _id: ingredientId } } });
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