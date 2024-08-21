// src/components/CourseInstances.js

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

    return (
        <div>
            <h2>Course Instances</h2>
            <form onSubmit={filterCourseInstances}>
                <div>
                    <label>Year:</label>
                    <input 
                        type="text" 
                        value={year} 
                        onChange={(e) => setYear(e.target.value)} 
                        placeholder="Enter year (e.g., 2023)"
                    />
                </div>
                <div>
                    <label>Semester:</label>
                    <input 
                        type="text" 
                        value={semester} 
                        onChange={(e) => setSemester(e.target.value)} 
                        placeholder="Enter semester (e.g., 1 or 2)"
                    />
                </div>
                <div>
                    <label>Course:</label>
                    <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
                        <option value="">Select Course</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>
                                {course.title} ({course.code})
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Filter</button>
            </form>

            <ul>
                {courseInstances.map(instance => (
                    <li key={instance.id}>
                        {instance.course_title} - {instance.year} (Semester {instance.semester})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseInstances;
