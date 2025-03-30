import { FC } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import DeleteCourseButton from "@/components/DeleteCourseButton";
import { Course } from "@/types/course";

interface CoursePageProps {
  params: {
    id: string;
  };
}

const CoursePage: FC<CoursePageProps> = async ({ params }) => {
  // Await params before accessing its properties
  const id = (await params).id;
  const courseId = parseInt(id, 10);
  
  // Check if the ID is valid
  if (isNaN(courseId)) {
    notFound();
  }
  
  // Get base URL from environment variables
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
  
  try {
    // Fetch course from the API with base URL
    const response = await fetch(`${baseUrl}/api/courses/${courseId}`, { next: { revalidate: 0 } });
    
    // If the response is not ok, show 404
    if (!response.ok) {
      notFound();
    }
    
    // Parse the course data
    const course: Course = await response.json();
    
    return (
      <div>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Button asChild variant="outline" className="mb-4">
                <Link href="/">← Back to Courses</Link>
              </Button>
              
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{course.title}</h1>
                <div className="space-x-2">
                  <Button asChild variant="outline">
                    <Link href={`/courses/${course.id}/edit`}>Edit</Link>
                  </Button>
                  <DeleteCourseButton courseId={course.id} />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-2">Course Description</h2>
              <p className="mb-4">{course.description}</p>
              
              <h2 className="text-xl font-semibold mb-2">Estimated Time</h2>
              <p>{course.estimatedTime}</p>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error fetching course:', error);
    notFound();
  }
};

export default CoursePage; 