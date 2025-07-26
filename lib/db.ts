import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = 'classattendance_db';

let client: MongoClient | null = null;
let db: Db | null = null;

async function connectToDatabase(): Promise<Db> {
  if (db) return db;

  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default connectToDatabase;