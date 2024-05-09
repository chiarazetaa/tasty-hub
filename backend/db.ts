const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://admin:admin@cluster0.n8sxzxw.mongodb.net/sample_restaurants?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('sample_restaurants');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        throw err;
    }
}

// Export the connected database instance directly
module.exports = { database: connectDB };