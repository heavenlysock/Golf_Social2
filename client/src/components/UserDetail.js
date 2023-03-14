import { useEffect, useState } from 'react'
import { useParams, useNavigate, json } from 'react-router-dom'
import ReviewDetail from './ReviewDetail'
import React from 'react'

function UserDetail({ onShowDetails, currentUser, onDeleteUser, onUpdateUser, setCurrentUser }) {

    const { id } = useParams()
    let navigate = useNavigate()
    const [isUpdating, setIsUpdating] = useState(false)
    const [name, setName] = useState(currentUser ? currentUser.name : '');
    const [image, setImage] = useState(currentUser?.image || '');
    const [currentVisitedUser, setCurrentVisitedUser] = useState()
    const [error, setError] = useState(null);
    
    useEffect(() => {
        console.log(currentVisitedUser)
        fetch(`/users/${id}`)
        .then(res => {
            if(res.ok) {
                res.json()
                .then(oneUser => setCurrentVisitedUser(oneUser))
            }
        })
    }, [])
    
    function handleAddFriend() {
        fetch('/friendships', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({recipient_id: currentVisitedUser.id})
        })

            .then((res) => {
            if (res.status === 201 ) {
              res.json().then(currentUserObj => {

                setCurrentUser(currentUserObj)
              }
              )
            } else {
              res.json().then(errorObj => alert(errorObj.error))
            }
            
            })
            .catch((error) => {
              console.error(error);
              setError('Failed to accept friendship.');
          });
      }

    function removeFriendship() {
        fetch('/friendships/remove', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({recipient_id: currentVisitedUser.id})
        })
            .then((res) => {
              if (res.status === 204) {
                // res.json().then(() => {
                  setCurrentUser({
                    ...currentUser,
                    accepted_friends: currentUser.accepted_friends.filter(friend => friend.id !== currentVisitedUser.id)
                  })
                
              } else {
              setError('Failed to reject friendship.');            
              }
            })
              .catch((error) => {
                console.error(error);
                setError('Failed to reject friendship.');
          });
    }
 

    function handleUserUpdate() {
        setIsUpdating(!isUpdating)
    }

    function handleUpdate(e) {
        e.preventDefault()
        let updateInput = {
            name: name,
            image: image
        }


        fetch(`/users/${currentUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateInput)
        }) 
        .then(res => {
            if(res.status === 202) {
                res.json()
                .then((updatedUser) => {
                    onShowDetails(updatedUser)
                    setCurrentVisitedUser(updatedUser)
                }) 
                .then(handleUserUpdate)
            }
            alert('Profile successfully updated!')
        })
    }
    
    function handleUserDelete(currentUser) {
        if(window.confirm('Are you sure you want to remove your account?')) {
            fetch(`/users/${currentUser.id}`, {
                method: 'DELETE'
              })
              .then(() => {
                  onDeleteUser(currentUser)
                  navigate.push('/login')
              })
        } 
    }
    

    return(
        <div>
            {currentVisitedUser ? 
                <div>
                    <div>
                        {isUpdating ? 
                            <div>
                                <button className='btn btn-secondary' onClick={() => handleUserUpdate(currentUser)}>Cancel</button>
                                <br/>
                                <form onSubmit={handleUpdate}>
                                    <div className='form-group row mx-5 my-2'>
                                        <label className='col-sm-2 col-form-label' htmlFor="name">Username</label>
                                        <div className='col-sm-8'>
                                            <input 
                                                className='form-control'
                                                type="text" 
                                                name="name" 
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='form-group row mx-5 my-2'>
                                        <label className='col-sm-2 col-form-label' htmlFor="image">Profile Picture</label>
                                        <div className='col-sm-8'>
                                            <input 
                                                className='form-control'
                                                type="text" 
                                                name="image" 
                                                value={image}
                                                onChange={e => setImage(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button className='btn btn-secondary' type="submit">Update</button>
                                </form>
                            </div>
                            :
                            <div className='card mb-3 mx-auto'>
                                <div className='row no-gutters flexCont'>
                                    <div className="col-md-4">
                                        <img className="card-img my-5 mx-5" alt="me" src={currentVisitedUser.image}/>
                                    </div>
                                    <div className='col-md-8'>
                                        <h3 className='card-title my-5'>{currentVisitedUser.name}</h3>
                                    {currentUser.accepted_friends.find(friend => currentVisitedUser.id === friend.id) ? <button className='btn btn-secondary' onClick={removeFriendship}>Remove Friend</button> : <button className='btn btn-secondary' onClick={handleAddFriend}>Add Friend</button>}
                                    </div>
                                </div>
                            </div>
                        }
                       {currentVisitedUser?.id === currentUser.id && !isUpdating ? 
    <div>
        <button className='btn btn-secondary' onClick={() => handleUserUpdate(currentUser)}>Update Profile</button> 
        <button className='btn btn-secondary' onClick={() => handleUserDelete(currentUser)}>Delete Account</button>
    </div> 
    : 
    null
}
                    </div>
                    <br/>
                    <div>
                        <h3>All {currentVisitedUser.name}'s Reviews</h3>
                        <div>
                            {currentVisitedUser.reviews ? 
                                <div className="container-fluid">
                                    <div className="row">
                                        {currentVisitedUser.reviews.map(review => <ReviewDetail key={review.id} review={review} />)}
                                    </div>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
                    :
                <p>Loading...</p>}
        </div>
    )
}

export default UserDetail