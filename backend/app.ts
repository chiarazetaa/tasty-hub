const fastify = require('fastify');
const cors = require('@fastify/cors');
const { database } = require('./db');

const app = fastify();
// enable CORS with specific origin
app.register(cors, {
    origin: 'http://localhost:4200',
});
const port = 3000;

// define a route
app.get('/api/data', async function (req: any, res: any) {
    try {
        const db = await database();
        let restaurants = await db.collection('restaurants').find({}).toArray();
        return restaurants;
    } catch (err) {
        console.error(err);
        return { error: 'Failed to fetch data from MongoDB' };
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