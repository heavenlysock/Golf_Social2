import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import ReviewForm from './ReviewForm'
import ReviewDetail from './ReviewDetail'
import React from 'react';

function CourseDetail({ onShowDetails, displayInfo, currentUser  }) {

    let { id } = useParams()

    const [showForm, setShowForm] = useState(false)
    const [currentReviews, setCurrentReviews] = useState([])
    const [currentCourse, setCurrentCourse] = useState(null)

console.log(currentCourse)
    useEffect(() => {
        fetch(`/courses/${id}`)
        .then(response => {
            if(response.ok) {
                response.json()
                .then(singleCourse => {
                    setCurrentCourse(singleCourse)
                })
            }
        })
    }, [id]);
        
    // useEffect(() => {
    //     onShowDetailsCallback()
    // }, [id, onShowDetailsCallback])

    function toggleForm() {
        setShowForm(!showForm)
    }

    function onSubmitNewReview(newReview) {
        setCurrentReviews([...currentReviews, newReview])
        onShowDetails(displayInfo)
        toggleForm()
    }

    return(
        <div>
            {currentCourse ? 
                <div>
                    <div className='card mb-3 mx-auto'>
                        <div className='row no-gutters flexCont'>
                            <div className="col-md-4">
                                <img
                                    src={currentCourse.image_url}
                                    className="card-img my-5 mx-5"
                                    alt="Course"
                                />
                                {/* </img> */}
                            </div>
                            <div className='col-md-8'>
                                <h3 className='card-title my-5'>{currentCourse.name} {currentCourse.location}</h3>
                                <p>Price: {currentCourse.price}</p> 
                                <p>Holes: {currentCourse.holes}</p> 
                                <p>Par: {currentCourse.par}</p> 
                                <p>Length: {currentCourse.length}</p> 

                            </div>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <div>
                            <h3>Reviews for {currentCourse.name} &#40;{currentCourse.reviews.length}&#41;</h3>
                        </div>
                        <br/>
                        <div>
                            <button className='btn btn-secondary' onClick={toggleForm}>{showForm ? "Cancel" : "Add Review"}</button>
                            {showForm ? <ReviewForm currentUser={currentUser} course={currentCourse} displayInfo={displayInfo} onSubmitNewReview={onSubmitNewReview} setCurrentReviews={setCurrentReviews} /> : null}
                        </div>
                        <br/>
                        <div className="container-fluid">
                            <div className="row">
                                {currentCourse.reviews.map(review => <ReviewDetail key={review.id} review={review}/>)}
                            </div>
                        </div>
                    </div>
                </div>
                    : 
                <p>Loading...</p>}
        </div>
    )
}

export default CourseDetail













































// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import ReviewForm from './ReviewForm'
// import ReviewDetail from './ReviewDetail'

// function CourseDetail({ onShowDetails, displayInfo, currentUser }) {

//     let { id } = useParams()

//     const [showForm, setShowForm] = useState(false)
//     const [currentReviews, setCurrentReviews] = useState([])



//     useEffect(() => {
//         fetch(`/courses/${id}`)
//         .then(response => {
//             if(response.ok) {
//                 response.json()
//                 .then(singleCourse => {
//                     onShowDetails(singleCourse)
//                     setCurrentReviews(singleCourse.reviews)
//                 })
//             }
//         })
//     }, [id, onShowDetails])

//     function toggleForm() {
//         setShowForm(!showForm)
//     }

//     function onSubmitNewReview(newReview) {
//         setCurrentReviews([...currentReviews, newReview])
//         onShowDetails(displayInfo)
//         toggleForm()
//     }

//     return(
//         <div>
//             {displayInfo ? 
//                 <div>
//                     <div className='card mb-3 mx-auto'>
//                         <div className='row no-gutters flexCont'>
//                             <div className="col-md-4">
//                                 <img
//                                     src={displayInfo.image_url}
//                                     className="card-img my-5 mx-5"
//                                     alt="Course"
//                                 />
//                                 {/* </img> */}
//                             </div>
//                             <div className='col-md-8'>
//                                 <h3 className='card-title my-5'>{displayInfo.brand} {displayInfo.location}</h3>
//                                 <p>Price: {displayInfo.price}</p> 
//                                 <p>Holes: {displayInfo.holes}</p> 
//                                 <p>Par: {displayInfo.par}</p> 
//                                 <p>Length: {displayInfo.length}</p> 

//                             </div>
//                         </div>
//                     </div>
//                     <br/>
//                     <div>
//                         <div>
//                             <h3>Reviews for {displayInfo.name} &#40;{displayInfo.total_reviews}&#41;</h3>
//                         </div>
//                         <br/>
//                         <div>
//                             <button className='btn btn-secondary' onClick={toggleForm}>{showForm ? "Cancel" : "Add Review"}</button>
//                             {showForm ? <ReviewForm currentUser={currentUser} displayInfo={displayInfo} onSubmitNewReview={onSubmitNewReview}/> : null}
//                         </div>
//                         <br/>
//                         <div className="container-fluid">
//                             <div className="row">
//                                 {currentReviews.map(review => <ReviewDetail key={review.id} review={review}/>)}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                     : 
//                 <p>Loading...</p>}
//         </div>
//     )
// }

// export default CourseDetail