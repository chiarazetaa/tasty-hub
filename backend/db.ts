const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://admin:admin@cluster0.n8sxzxw.mongodb.net/tasty_hub?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
    try {
        await client.connect();
        return client.db('tasty_hub');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        throw err;
    }
}

// Export the connected database instance directly
module.exports = { database: connectDB };