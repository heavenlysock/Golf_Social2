import { useEffect, useState } from "react"
import CourseForm from "./CourseForm"
// import CourseDetail from "./CourseDetail"
import CourseItem from "./CourseItem"
import ReviewItem from "./ReviewItem"
import React from 'react';

function CourseList() {

    const [courseList, setCourseList] = useState([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        fetch('/courses')
            .then(response => response.json())
            .then(courses => setCourseList(courses))
    }, [])

    function toggleForm() {
        setShowForm(!showForm)
    }

    function onSubmitNewCourse(newCourse) {
        setCourseList([...courseList, newCourse])
        toggleForm()
    }

    return(
        <div>
            <h1>
                Courses
            </h1>
            <br/>
            <div>
                <button className='btn btn-secondary' onClick={toggleForm}>{showForm ? "Cancel" : "Add Course"}</button>
                {showForm ? <CourseForm onSubmitNewCourse={onSubmitNewCourse}/> : null}
            </div>
            <br/>
            <div className="container-fluid">
                <div className="row">
                    {courseList.map(course => <CourseItem key={course.id} displayInfo={course.displayInfo} courseId={course.Id} course={course}/>)}
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default CourseList 