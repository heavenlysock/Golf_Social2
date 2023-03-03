import { NavLink } from 'react-router-dom';
import { useState } from 'react';
// import FinalReview from './FinalReview';
function ReviewItem({ review, setReviews, isAuthenticated, setRevList }) {
  const [updateForm, setUpdateForm] = useState(false) 
  const [editReview, setEditReview] = useState({
    pros: "",
    cons: ""
  });
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
            resp.json().then(data => 
                setRevList(current => {
                const finalEdit = current.findIndex(element => element.id === review.id)
                return [...current.slice(0, finalEdit), finalEdit, ...current.slice(finalEdit + 1)]

                })
            )
        }
      })
      
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
            <div class="card text-card">
                {/* <h4 className='card-title my-3'>Course and Location: {review.overall_rating}</h4> */}
                

                    <p>{review.course.name}</p>
                    <p>{review.course.location}</p>


                    <p>Review:</p>
                    <p>Pros: {review.pros}</p>
                    <p>Cons: {review.cons}</p>

                    <p>by {review.user.name}</p>
                
                <button onClick={ ()=> setUpdateForm(current => !current)}>
                    Update
                </button>
            </div>
        </div>
    <div> { updateForm ? 
        <form onSubmit={handleUpdateClick}>
                <label className='col-sm-2 col-form-label' htmlFor="prosComment">Pros</label>
                <div className='col-sm-6'>
                    <input
                        className='form-control'
                        type="text"
                        name="pros" 
                        value={editReview.pros}
                        onChange={handleFormChange}
                    />
                </div>
                    <br/>
                        <label className='col-sm-2 col-form-label' htmlFor="consComment">Cons</label>
                        <div className='col-sm-6'>
                            <input
                                className='form-control'
                                type="text" 
                                name="cons" 
                                value={editReview.cons}
                                onChange={handleFormChange}
                            />
                        </div>
                    

                    
                    <br/>
                    <button className='btn btn-secondary'>Update Review</button>
                    
                </form> :
                null
                }
                <button onClick={()=> handleDeleteClick()}>Delete Review</button>
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