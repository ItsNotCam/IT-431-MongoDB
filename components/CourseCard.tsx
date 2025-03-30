import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Course } from "@/models/courseModel";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-gray-600">{course.description}</p>
        <p className="mt-4 text-2xl font-bold">{course.estimatedTime}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/courses/${course.id}`} className="w-full">
          <Button className="bg-gradient-to-r from-blue-300 to-blue-700 hover:from-blue-600 hover:to-blue-800 w-full" >
            View Course
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
} 