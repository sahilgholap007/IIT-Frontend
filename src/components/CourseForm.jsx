import React, { useState } from 'react';
import axios from 'axios';

const CourseForm = ({ fetchCourses }) => {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');

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
            fetchCourses(); // Re-fetch the courses after adding a new one
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <h2 className='text-xl'>Add Course</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Course Title"
                className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Course Code"
                className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Course Description"
                className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button type="submit" className='px-4 py-2 border border-gray-300 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                Add Course
            </button>
        </form>
    );
};

export default CourseForm;
