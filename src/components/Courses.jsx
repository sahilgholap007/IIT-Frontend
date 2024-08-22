import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseForm from './CourseForm';
import CourseTable from './CourseTable';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/courses/');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    return (
        <div className='flex gap-5'>
            <CourseTable courses={courses} fetchCourses={fetchCourses} />
        </div>
    );
};

export default Courses;
