// src/components/AddCourseInstance.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCourseInstance = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios
      .get('http://127.0.0.1:8000/api/courses/')
      .then((response) => setCourses(response.data))
      .catch((error) => console.error('Error fetching courses:', error));
  };

  const handleRefresh = () => {
    fetchCourses();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (year && semester && courseId) {
      axios
        .post('http://127.0.0.1:8000/api/instances/', {
          year: parseInt(year),
          semester: parseInt(semester),
          course: parseInt(courseId),
        })
        .then((response) => {
          alert('Course instance added successfully!');
          setYear('');
          setSemester('');
          setCourseId('');
          fetchCourses(); // Refresh the courses after adding a new instance
        })
        .catch((error) => {
          console.error('Error adding course instance:', error);
          alert('Failed to add course instance.');
        });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 className="text-xl">Add Course Instance</h2>
      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Enter year (e.g., 2023)"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        placeholder="Enter semester (e.g., 1 or 2)"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Course</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.title} ({course.code})
          </option>
        ))}
      </select>
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          className="px-4 py-2 border border-gray-300 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Instance
        </button>
        <button
          type="button"
          onClick={handleRefresh}
          className="px-4 py-2 border border-gray-300 rounded-md bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Refresh
        </button>
      </div>
    </form>
  );
};

export default AddCourseInstance;
