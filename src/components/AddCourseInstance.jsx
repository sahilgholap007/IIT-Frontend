// src/components/AddCourseInstance.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCourseInstance = () => {
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/courses/')
            .then(response => setCourses(response.data))
            .catch(error => console.error('Error fetching courses:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (year && semester && courseId) {
            axios.post('http://127.0.0.1:8000/api/instances/', {
                year: parseInt(year),
                semester: parseInt(semester),
                course: parseInt(courseId),
            })
            .then(response => {
                alert('Course instance added successfully!');
                setYear('');
                setSemester('');
                setCourseId('');
            })
            .catch(error => {
                console.error('Error adding course instance:', error);
                alert('Failed to add course instance.');
            });
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <div>
            <h2>Add Course Instance</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Add Instance</button>
            </form>
        </div>
    );
};

export default AddCourseInstance;
