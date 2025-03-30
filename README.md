# Courses Management Application

This is a demonstration application built with [Next.js](https://nextjs.org) that showcases CRUD (Create, Read, Update, Delete) operations against a JSON file as a data store. It provides a simple but functional course management system with a modern UI.

## Features

- **Create** new courses with titles, descriptions, and estimated completion times
- **Read** course information from a local JSON data store
- **Update** existing course details
- **Delete** courses
- Clean, responsive UI built with Next.js App Router and React

## Technology Stack

- [Next.js](https://nextjs.org) with App Router
- React
- TypeScript
- JSON file-based data storage (as a database alternative for demonstration)
- [shadcn/ui](https://ui.shadcn.com/) for UI components

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm, yarn, or pnpm as your package manager

## Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd courses-management-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up the environment variables:
   Create a `.env.local` file in the root directory with the following content:

   ```
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   > **IMPORTANT:** Make sure the URL in `NEXT_PUBLIC_APP_URL` matches exactly with the endpoint displayed when you run the development server (typically http://localhost:3000, but it may be different if that port is in use). This ensures API routes work correctly for your specific setup.

   This variable is used to ensure API routes work correctly in both development and production environments.

## Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## How It Works

The application stores course data in a JSON file located in the project. The API routes in the `app/api` directory handle CRUD operations by reading from and writing to this JSON file.

- **List Courses**: The home page fetches and displays all courses
- **View Course**: Click on a course to view its details
- **Create Course**: Use the "Add Course" button to create a new course
- **Edit Course**: Click the "Edit" button on a course details page
- **Delete Course**: Click the "Delete" button on a course details page

## Project Structure

- `app/page.tsx`: Home page with course listings
- `app/courses/[id]/page.tsx`: Course details page
- `app/courses/[id]/edit/page.tsx`: Edit course page
- `app/api/courses/route.ts`: API endpoint for getting all courses and creating new ones
- `app/api/courses/[id]/route.ts`: API endpoint for getting, updating, and deleting specific courses
- `components/`: Reusable UI components
- `types/`: TypeScript type definitions
- `data/courses.json`: JSON file that serves as the data store

## Learning Points

This project demonstrates:

1. Next.js App Router architecture
2. Server and client components in Next.js
3. Handling asynchronous operations
4. Type safety with TypeScript
5. Simple file-based data persistence
6. API route implementation
7. Form handling in React

## License

This project is open-source and available under the MIT License.

---

_Built by Randy Michak as a demonstration project for Next.js CRUD operations._
