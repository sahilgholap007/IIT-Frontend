// src/components/Courses.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/courses/', {
                title,
                code,
                description
            });
            setTitle('');
            setCode('');
            setDescription('');
            fetchCourses();
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    return (
        <div>
            <h2>Courses</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Course Title"
                />
                <input 
                    type="text" 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)} 
                    placeholder="Course Code"
                />
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Course Description"
                />
                <button type="submit">Add Course</button>
            </form>

            <ul>
                {courses.map(course => (
                    <li key={course.id}>
                        {course.title} - {course.code}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Courses;
