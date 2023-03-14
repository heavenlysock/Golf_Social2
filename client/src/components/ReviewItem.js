// import { NavLink } from 'react-router-dom';
import { useState } from 'react';
// import Switch from 'react-toggle-switch';
// import FinalReview from './FinalReview';
function ReviewItem({ review, setReviews, isAuthenticated, setRevList, currentUser }) {
  const [updateForm, setUpdateForm] = useState(false) 
  const [editReview, setEditReview] = useState({
    comment: "",
    favorite: "",
    rating: ""
  });
  
  const isFavorited = review.favorite ? true : false;
//   const [isEditing, setIsEditing] = useState(false);
// console.log(review)
  const handleFormChange = (e) => {
    setEditReview({ ...editReview, [e.target.name]: e.target.value });
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    fetch(`/reviews/${review.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editReview),
    })
      .then((resp) => {
        if (resp.status === 202) {
            resp.json().then(updatedReview => {
              setRevList(current => {
                  const finalEdit = current.findIndex(element => element.id === updatedReview.id)
                return [...current.slice(0, finalEdit), updatedReview, ...current.slice(finalEdit + 1)]

                })
              })
            setUpdateForm(current => !current)
        }
      })
      
  };

  const handleFavoriteClick = () => {
    setEditReview(prevReview => ({
      ...prevReview,
      favorite: !prevReview.favorite
    }));
  };
  
 
  const handleDeleteClick = () => {
    fetch(`/reviews/${review.id}`, {
      method: 'DELETE',
    })
      .then((resp) => {
        if (resp.status === 204) {
            setRevList(dataFam => {
                const newList = dataFam.filter(element => element.id !== review.id)
                return newList
              })
        }
      })
    }
      
    
    // console.log(review.course)
  return (

  <div>
    <div className="card-deck col-sm-3 my-3">
              
                <div className="card text-card">
                 
                    

                        <p>{review.course?.name}</p>
                        <p>{review.course?.rating}</p>

                        <p>Review:</p>
                        <p>Comment:{review.comment}</p>
                        {isFavorited && <p>Favorite: Yes</p>}
                        {!isFavorited && <p>Favorite: No</p>}
                      

                        <p>by {review.user?.name}</p>
                    
                        {review.user?.id === currentUser.id ? <button onClick={ ()=> setUpdateForm(current => !current)}>
                        Update
                        </button> : null}
                </div>
               
            </div>
        <div> { updateForm ? 
        <form onSubmit={handleUpdateClick}>
                <label className='col-sm-2 col-form-label' htmlFor="comment">Comment</label>
                <div className='col-sm-6'>
                    <input
                        className='form-control'
                        type="text"
                        name="comment" 
                        value={editReview.comment}
                        onChange={handleFormChange}
                    />
                </div>
                    <br/>
                    <div className='col-sm-6'>
                    <input type="radio" name="favorite" value="true" onChange={handleFormChange}/>
                    <label for="contactChoice2">Favorite</label>

                    <input type="radio" name="favorite" value="false" onChange={handleFormChange}/>
                    <label for="contactChoice3">Remove Favorite</label>


                      {/* <button
                        className={`btn btn-${editReview.favorite ? 'success' : 'secondary'}`}
                        onClick={() => handleFavoriteClick()}
                      >
                        {editReview.favorite ? 'Favorite' : 'Remove Favorite'}
                      </button> */}
                    </div>
                    

                    
                    <br/>
                    <button className='btn btn-secondary'>Update Review</button>
                    
                </form> :
                null
                }
                {currentUser.id === review.user.id ? <button onClick={()=> handleDeleteClick()}>Delete Review</button> : null}
        </div>
    </div>
    )
}

export default ReviewItem
















//   return (
//     <div className="card-deck col-sm-3 my-3">
//         </div>
//       <div className="card text-card">
//         </div>
//        {review && review.course && (
//           <NavLink to={`/courses/${review.course.id}`}>
//             <p>{review.course.name}</p>
//             <p>{review.course.location}</p>
//           </NavLink>
//         )}
//         {review && review.user && (
//           <NavLink to={`/users/${review.user.id}`}>
//             <div>
//               <p>Review:</p>
//               {isEditing ? (
//                 <div>
//                   <label>Pros:</label>
//                   <textarea name="pros" value={editReview.pros} onChange={handleFormChange} />
//                   <label>Cons:</label>
//                   <textarea name="cons" value={editReview.cons} onChange={handleFormChange} />
//                 </div>
//               ) : (
//                 <div>
//                   {review.pros && <p>Pros: {review.pros}</p>}
//                   {review.cons && <p>Cons: {review.cons}</p>}
//                 </div>
//               )}
//               <p>by {review.user.name}</p>
//             </div>
//           </NavLink>
//         )}
//         {isAuthenticated && review && review.user && review.user.id === currentUser.id ? (
//           <div className="d-flex justify-content-around">
//             {isEditing ? (
//               <div>
//                 <button className="btn btn-sm btn-success" onClick={handleUpdateClick}>
//                   Save
//                 </button>
//                 // <button className="btn btn-sm btn-secondary" onClick={() => setIsEditing(false)}>
//                 //   Cancel
//                 // </button>
//               </div>
//             ) : (
//               <div>
//                 // <button className="btn btn-sm btn-warning" onClick={() => setIsEditing(true)}>
//                 //   Edit
//                 // </button>
//                 <button className="btn btn-sm btn-danger" onClick={handleDeleteClick}>
//                   Delete
//                 </button>
//               </div>
//           )}
//           </div>
//     )
// }

// export default ReviewItem




// import { NavLink } from 'react-router-dom'

// function ReviewItem({ review, isAuthenticated, onDeleteReview, currentUser }) {

//     return(
//         <div className="card-deck col-sm-3 my-3">
//             <div class="card text-card">
//                 <h4 className='card-title my-3'>Course and Location:</h4>
//                 {review && review.course && (
//                     <NavLink to={`/courses/${review.course.id}`}>
//                         <p>{review.course.name}</p>
//                         <p>{review.course.location}</p>
//                     </NavLink>
//                 )}
//                 {review && review.user && (
//                     <NavLink to={`/users/${review.user.id}`}>
//                         <p>Review:</p>
//                         {review.pros && <p>Pros: {review.pros}</p>}
//                         {review.cons && <p>Cons: {review.cons}</p>}
//                         <p>by {review.user.name}</p>
//                     </NavLink>
//                 )}
//                 {isAuthenticated && review && review.user && review.user.id === currentUser.id ?
//                     <div className="d-flex justify-content-around">
//                         <button className="btn btn-sm btn-warning" onClick={() => alert('Update clicked!')}>
//                             Update
//                         </button>
//                         <button className="btn btn-sm btn-danger" onClick={() => onDeleteReview(review.id)}>
//                             Delete
//                         </button>
//                     </div> :
//                     null
//                 }
//             </div>
//         </div>
//     )
// }

// export default ReviewItem