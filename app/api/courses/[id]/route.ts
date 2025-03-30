import { NextResponse } from "next/server";
import { Course } from "@/types/course";
import { readCourses } from "@/lib/db";
import MongoConnection, { ENV } from "@/lib/mongoClient";
import { Collection } from "mongodb";

// GET: Retrieve a course by ID
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> } // Await params
) {
  try {
    const { id } = await context.params; // Await params before accessing
    const courseId = parseInt(id, 10);

    if (isNaN(courseId)) {
      return NextResponse.json(
        { error: "Invalid course ID." },
        { status: 400 }
      );
    }

    const courses = await readCourses();
		if (!courses) {
			return NextResponse.json(
				{ error: "Failed to read courses." },
				{ status: 500 }
			);
		}

    const course = courses.find((c) => c.id === courseId);
    if (!course) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error("Error retrieving course:", error);
    return NextResponse.json(
      { error: "Failed to retrieve course." },
      { status: 500 }
    );
  }
}

// PUT: Update a course by ID
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> } // Await params
) {
  try {
    const { id: reqId } = await context.params; // Await params before accessing
    const courseId = parseInt(reqId, 10);
    if (isNaN(courseId)) {
      return NextResponse.json(
        { error: "Invalid course ID." },
        { status: 400 }
      );
    }

    const requestCourse = await request.json();
		const db = (await MongoConnection).db(ENV.MONGODB_NAME);
		const collection: Collection<Course> = db.collection<Course>(ENV.MONGODB_COLLECTION);

		let existingCourse = await collection.findOne({ id: courseId });
		if (!existingCourse) {
			return NextResponse.json(
				{ error: "Course not found." },
				{ status: 404 }	
			);
		}

		const { id, _id, ...updatedData } = requestCourse;
		const result = await collection.updateOne(
			{ id: courseId }, 
			{ $set: updatedData }
		);

		if (!result.acknowledged) {
			return NextResponse.json(
				{ error: "Failed to update course." },
				{ status: 500 }
			);
		}

    return NextResponse.json(requestCourse, { status: 200 });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: "Failed to update course." },
      { status: 500 }
    );
  }
}

// DELETE: Remove a course by ID
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> } // Await params
) {
  try {
    const { id } = await context.params; // Await params before accessing
    const courseId = parseInt(id, 10);
    if (isNaN(courseId)) {
      return NextResponse.json(
        { error: "Invalid course ID." },
        { status: 400 }
      );
    }

		const db = (await MongoConnection).db(ENV.MONGODB_NAME);
		const collection: Collection<Course> = db.collection<Course>(ENV.MONGODB_COLLECTION);
		try {
			const result = await collection.deleteOne({ id: courseId });
			if(!result.acknowledged) {
				return NextResponse.json(
					{ error: "Failed to delete course." },
					{ status: 500 }
				);
			}
		} catch (error) {
			console.error("Failed to delete course:", error);
			return NextResponse.json(
				{ error: "Failed to delete course." },
				{ status: 500 }
			);
		}

    return NextResponse.json(
      { message: `Course with ID ${courseId} deleted.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { error: "Failed to delete course." },
      { status: 500 }
    );
  }
}
