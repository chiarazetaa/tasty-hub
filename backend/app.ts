const fastify = require('fastify');
const { db } = require('./db');

const app = fastify();
const port = 3000;

// define a route
app.get('/', async function (req: any, res: any) {
    try {
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