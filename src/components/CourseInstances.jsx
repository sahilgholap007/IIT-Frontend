import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseInstances = () => {
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courses, setCourses] = useState([]);
    const [courseInstances, setCourseInstances] = useState([]);

    // Fetch all courses and course instances on component mount
    useEffect(() => {
        fetchCourses();
        fetchCourseInstances();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/courses/');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchCourseInstances = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/instances/');
            setCourseInstances(response.data);
        } catch (error) {
            console.error('Error fetching course instances:', error);
        }
    };

    const filterCourseInstances = async (e) => {
        e.preventDefault();

        let url = 'http://127.0.0.1:8000/api/instances/';
        if (year && semester && courseId) {
            url = `${url}?year=${year}&semester=${semester}&course=${courseId}`;
        } else if (year && semester) {
            url = `${url}?year=${year}&semester=${semester}`;
        } else if (year) {
            url = `${url}?year=${year}`;
        } else if (semester) {
            url = `${url}?semester=${semester}`;
        } else if (courseId) {
            url = `${url}?course=${courseId}`;
        }

        try {
            const response = await axios.get(url);
            setCourseInstances(response.data);
        } catch (error) {
            console.error('Error filtering course instances:', error);
        }
    };

    const handleDelete = (instanceId) => {
        // Implement delete logic here
        console.log(`Deleting instance with ID: ${instanceId}`);
    };

    const handleExplore = (instanceId) => {
        // Implement explore logic here
        console.log(`Exploring instance with ID: ${instanceId}`);
    };

    const getCourseCodeById = (courseTitle) => {
        const course = courses.find(c => c.title === courseTitle);
        return course ? course.code : 'N/A';
    };

    return (
        <div className='flex flex-col gap-5'>
            <form onSubmit={filterCourseInstances} className='flex gap-5'>
                <h2 className='text-xl'>Course Instances</h2>
                <div>
                    <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Enter year (e.g., 2023)"
                        className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        placeholder="Enter semester (e.g., 1 or 2)"
                        className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <div>
                    <select value={courseId} onChange={(e) => setCourseId(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select Course</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>
                                {course.title} ({course.code})
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="px-4 py-2 border border-gray-300 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Filter</button>
            </form>

            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border">Course Title</th>
                            <th className="px-4 py-2 border">Year-Semester</th>
                            <th className="px-4 py-2 border">Course Code</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseInstances.map(instance => (
                            <tr key={instance.id} className="border-b">
                                <td className="px-4 py-2 border">{instance.course_title}</td>
                                <td className="px-4 py-2 border">{instance.year} (Semester {instance.semester})</td>
                                <td className="px-4 py-2 border">{getCourseCodeById(instance.course_title)}</td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => handleDelete(instance.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleExplore(instance.id)}
                                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                    >
                                        Explore
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CourseInstances;
