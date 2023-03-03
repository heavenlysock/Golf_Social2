import { Link } from 'react-router-dom'
import React from 'react'

function ReviewDetail({ review }) {
    return(
        <div className="card-deck col-sm-3 my-3">
            <div class="card text-card">
                <h4 className='card-title my-3'>Reviews</h4>

                    <p>pros: {review.pros}</p>
                    <p>cons: {review.cons}</p>
                    {/* <p>rating: {review.rating}</p> */}

                <Link to={`/users/${review.user.id}`}>
                    <p>By {review.user.name}</p>
                </Link>
                    {/* <p className='card-body'></p> */}
            </div>
        </div>
    )
}

export default ReviewDetail;