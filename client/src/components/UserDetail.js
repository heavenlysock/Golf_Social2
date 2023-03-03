import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReviewDetail from './ReviewDetail'
import React from 'react'

function UserDetail({ onShowDetails, displayInfo, currentUser, onDeleteUser, onUpdateUser }) {

    let { id } = useParams()
    let navigate = useNavigate()
    const [isUpdating, setIsUpdating] = useState(false)
    const [name, setName] = useState(currentUser ? currentUser.name : '');
    const [image, setImage] = useState(currentUser?.image || '');

    useEffect(() => {
        fetch(`/users/${id}`)
        .then(res => {
            if(res.ok) {
                res.json()
                .then(oneUser => onShowDetails(oneUser))
            }
        })
    }, [id, onShowDetails])

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
                    .then((updatedUser) => onShowDetails(updatedUser)) 
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
            {displayInfo ? 
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
                                        <img className="card-img my-5 mx-5" alt="me" src={displayInfo.image}/>
                                    </div>
                                    <div className='col-md-8'>
                                        <h3 className='card-title my-5'>{displayInfo.name}</h3>
                                    </div>
                                </div>
                            </div>
                        }
                        {displayInfo.id === currentUser.id && !isUpdating ? 
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
                        <h3>All {displayInfo.name}'s Reviews</h3>
                        <div>
                            {displayInfo.reviews ? 
                                <div className="container-fluid">
                                    <div className="row">
                                        {displayInfo.reviews.map(review => <ReviewDetail key={review.id} review={review}/>)}
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