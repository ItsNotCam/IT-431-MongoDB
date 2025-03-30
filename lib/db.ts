import { Course } from "@/types/course";
import MongoConnection, { ENV } from "./mongoClient";
import { Collection, Db, MongoClient } from "mongodb";

export const readCourses = async(): Promise<Course[] | null> => {
	try {
		const client: MongoClient = await MongoConnection;
		const db: Db = client.db(ENV.MONGODB_NAME);
		const courses: Collection<Course> = db.collection<Course>(ENV.MONGODB_COLLECTION);

		const courseArr = courses.find().toArray();
		return courseArr;
	} catch(error) {
		console.error(error);
	}

	return null;
};