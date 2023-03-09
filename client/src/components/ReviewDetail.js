import { NavLink } from 'react-router-dom'
import React from 'react'

function ReviewDetail({ review }) {
    return(
        <div className="card-deck col-sm-3 my-3">
            <div className="card text-card">
                <h4 className='card-title my-3'>Reviews</h4>
                    <p>favorite: {review.favorite}</p>
                    <p>comment: {review.comment}</p>
                    <p>rating: {review.rating}</p>
                    {/* <p>rating: {review.rating}</p> */}

                <NavLink to={`/users/${review.user.id}`}>
                    <p>By {review.user.name}</p>
                </NavLink>
                    {/* <p className='card-body'></p> */}
            </div>
        </div>
    )
}

export default ReviewDetail;