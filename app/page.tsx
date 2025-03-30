import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import CourseCard from "@/components/CourseCard";

interface Course {
  id: number;
  title: string;
  description: string;
  estimatedTime: string;
}

// This is a Server Component that fetches data
async function getCourses(): Promise<Course[]> {
  try {
    // Use relative URL for API routes in the same Next.js app
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const res = await fetch(`${baseUrl}/api/courses`, {
      cache: "no-store", // Disable caching for this request
    });
    
    if (!res.ok) {
      console.error('API response error:', await res.text());
      throw new Error(`Failed to fetch courses: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching courses:', error);
    return []; // Return empty array on error to prevent UI from breaking
  }
}

const Home: FC = async () => {
  const courses = await getCourses();
  
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center">Available Courses</h1>
          <Link href="/courses/add">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800">
              Add New Course
            </Button>
          </Link>
        </div>
        
        {courses.length === 0 ? (
          <p className="text-center text-gray-500">No courses available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
