import { NavLink } from 'react-router-dom'
import React from 'react'

function UserInfo({ user }) {
    return(
        <div className="card-deck col-sm-3 my-3">
            <NavLink to={`/users/${user.id}`}>
                <div className="card text-card">
                    <img className="card-img-top" alt='me' src={user.image}/>
                    <h4 className='card-title my-3'>{user.name}</h4>
                    <div className='card-body'>
                        <p>{user.number_of_reviews} Reviews</p>
                        <p>See {user.name}'s information</p>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default UserInfo