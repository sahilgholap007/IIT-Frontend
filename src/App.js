// src/App.js

import React from 'react';
import Courses from './components/Courses';
import AddCourseInstance from './components/AddCourseInstance';
import CourseInstances from './components/CourseInstances';

function App() {
    return (
        <div className="App">
            <h1>Course Management</h1>
            <Courses />
            <AddCourseInstance />
            <CourseInstances />
        </div>
    );
}

export default App;
