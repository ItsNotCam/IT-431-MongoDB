import { NextResponse } from "next/server";
import { Course } from "@/types/course";
import { Collection } from "mongodb";
import MongoConnection, { ENV } from "@/lib/mongoClient";
import { readCourses } from "@/lib/db";

// GET: Retrieve all courses
export async function GET() {
  try {
    const courses = await readCourses();
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Error retrieving courses:", error);
    return NextResponse.json(
      { error: "Failed to retrieve courses." },
      { status: 500 }
    );
  }
}

// POST: Add a new course
export async function POST(request: Request) {
  try {
    const newCourseData: Omit<Course, "id"> = await request.json();

		const db = (await MongoConnection).db(ENV.MONGODB_NAME);
		const collection: Collection<Course> = db.collection<Course>(ENV.MONGODB_COLLECTION);

		const sortedCourses: Course[] = await collection.find().sort({ id: -1 }).toArray();
		const lastIndex: number = sortedCourses.length > 0 ? sortedCourses[0].id : 0;

		const newCourse = {
			id: lastIndex + 1,
			...newCourseData,
		};

		const result = await collection.insertOne(newCourse);
		if(!result.acknowledged) {
			console.error("Failed to insert course");
			return NextResponse.json(
				{ error: "Failed to insert course" },
				{ status: 500 }
			);
		}

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error("Error adding course:", error);
    return NextResponse.json(
      { error: "Failed to add course." },
      { status: 500 }
    );
  }
}
