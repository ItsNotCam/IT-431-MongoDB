import {MongoClient} from 'mongodb';
import dotenv from "dotenv";

dotenv.config({ path: '../.env.local' });
if (!process.env.MONGODB_URI || !process.env.MONGODB_NAME || !process.env.MONGODB_COLLECTION) {
	throw new Error("Please ensure MONGODB_URI, MONGODB_NAME, and MONGODB_COLLECTION are set in the .env.local file.");
}


const MONGODB_URI: string = process.env.MONGODB_URI;
const client: MongoClient = new MongoClient(MONGODB_URI);
const MongoConnection: Promise<MongoClient> = client.connect();

export default MongoConnection;
export const ENV = {
	MONGODB_NAME: process.env.MONGODB_NAME,
	MONGODB_COLLECTION: process.env.MONGODB_COLLECTION
}
