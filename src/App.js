// src/App.js

import React from "react";
import CourseForm from "./components/CourseForm";
import CourseTable from "./components/CourseTable";
import AddCourseInstance from "./components/AddCourseInstance";
import Courses from "./components/Courses";
import CourseInstances from "./components/CourseInstances";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Course Management
      </h1>
      <div className="w-full max-w-[90vw] bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <CourseForm />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <AddCourseInstance />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Courses />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <CourseInstances />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
