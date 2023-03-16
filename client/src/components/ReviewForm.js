import { useState } from 'react'
import React from 'react'

function ReviewForm({ onSubmitNewReview, course }) {
// console.log(course.reviews)
    const [rating, setRating] = useState("")
    const [favorite, setFavorite] = useState("")
    const [comment, setComment] = useState("")
    const [seeReviews, setSeeReviews] = useState(course.reviews)

    console.log(seeReviews)
    // const [recommendBool, setRecommendBool] = useState("")

    const [reviewInput, setReviewInput] = useState({
        comment: "",
        rating: "",
        favorite: "",
        course_id: course.id
    })
    function handleSubmit(e) {
        e.preventDefault()
     
        fetch('/reviews', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(reviewInput)
        })
            .then(res => {
                if(res.status === 201) {
                    res.json()
                    .then(newReview => {
                        return setSeeReviews(current => [...current, newReview])
                    })
                }

            })
        setRating("")
        setComment("")
        setFavorite("")
        // setRecommendBool("")
    }
    // useEffect(() => {
    //     seeReviews

    // },[seeReviews]) 
    const handleChange = (e) => {
        setReviewInput({...reviewInput, [e.target.name]:e.target.value})



    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <datalist id="tickmarks">
                    <option value="0" label="0">0</option>
                    <option value="1" label="1">1</option>
                    <option value="2" label="2">2</option>
                    <option value="3" label="3">3</option>
                    <option value="4" label="4">4</option>
                    <option value="5" label="5">5</option>
                    <option value="6" label="6">6</option>
                    <option value="7" label="7">7</option>
                    <option value="8" label="8">8</option>
                    <option value="9" label="9">9</option>
                    <option value="10" label="10">10</option>
                </datalist>
                <div className='form-group row mx-5 my-2'>
                    <label className='col-sm-2 col-form-label' htmlFor="rating">Rating</label>
                    <div className='col-sm-2'>
                        <input  
                            type="range" 
                            min="0"
                            max="10"
                            step="0.5"
                            list="tickmarks"
                            name="rating" 
                            value={reviewInput.rating}
                            onChange={handleChange}
                        />
                    </div>
                    <label className='col-sm-2 col-form-label' htmlFor="comment">Comment</label>
                    <div className='col-sm-6'>
                        <input
                            className='form-control'
                            type="text" 
                            name="comment" 
                            value={reviewInput.comment}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <br/>
                <div className='form-group row mx-5 my-2'>
                    <label className='col-sm-2 col-form-label' htmlFor="favorite">Favorite</label>
                    <div className='col-sm-6'>
                        <input
                            className='form-control'
                            type="text" 
                            name="favorite" 
                            value={reviewInput.favorite}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <br/>
                {/* <div className='form-group row mx-5 my-2'>
                    <label className='col-sm-2 col-form-label' htmlFor="recommendBool">Recommendation</label>
                    <div className='col-sm-6'>
                        <input
                            className='form-control'
                            type="checkbox"
                            name="recommendBool" 
                            value={recommendBool}
                            onChange={e => setRecommendBool(e.target.checked)}
                        />
                    </div>
                </div> */}
                <br/>
                <button className='btn btn-secondary' type="submit">Add Review</button>
            </form>
        </div>
    )
}

export default ReviewForm