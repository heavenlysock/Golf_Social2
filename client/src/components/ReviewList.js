import { useEffect, useState } from "react"
import React from 'react'
import ReviewItem from './ReviewItem'



function ReviewList() {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [revList, setRevList] = useState([])

    useEffect(() => {
        fetch('/reviews')
            .then(res => res.json())
            .then(reviews => setRevList(reviews))
    }, [setRevList])

    return (
        <div>
          <h1>Reviews</h1>
          <div className="container-fluid">
            <div className="row">
              {Array.isArray(revList) && revList.map(review => (
                <ReviewItem key={review.id} review={review} setRevList={setRevList} />
                
              ))}
            </div>
            {/* <div>
               <ReviewForm
                  isAuthenticated={isAuthenticated}
                  onSubmitNewReview={onSubmitNewReview}
                  onUpdateReview={onUpdateReview}
                  onDeleteReview={onDeleteReview}
                  course={course}
                  review={review}
                />
            </div> */}
          </div>
        </div>
      );
    }
    
    export default ReviewList;