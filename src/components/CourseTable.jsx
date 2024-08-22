import React from 'react';
import axios from 'axios';

const CourseTable = ({ courses, fetchCourses }) => {

    const handleDelete = async (courseId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/courses/${courseId}/`);
            fetchCourses(); // Re-fetch the courses after deleting
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    return (
        <div className="flex-1">
            <h2 className='text-xl mb-7'>Courses List</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className='bg-gray-200'>
                        <th className="px-4 py-2 border">Course Title</th>
                        <th className="px-4 py-2 border">Course Code</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.id}>
                            <td className="px-4 py-2 border">{course.title}</td>
                            <td className="px-4 py-2 border">{course.code}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                                    onClick={() => handleDelete(course.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Explore
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseTable;
