import React from 'react'
import { Link } from 'react-router-dom'

function Main({ currentUser }) {
    return(
        <div className='main-container'>
            {/* <div className="home-img"> */}
                <img className='main-image' src='https://media.istockphoto.com/id/136546200/vector/golf-grunge-background.jpg?s=612x612&w=0&k=20&c=Q13lUna2_UcgTGQpTc628vydJCETLdqsC7ae97JtJ88=' alt="background_img"/>
            {/* </div> */}
            <div className="main-text">
                <h1>Golf Course Reviews</h1>
                <h3>{currentUser ? `Welcome, ${currentUser.name}!` : "for information on the best courses near you and around the world"}</h3>
                <br/>
                <div>
                    <div>
                        {currentUser ?
                            <Link to='/reviews'>
                                <button className='btn btn-secondary btn-lg'>Check Out Reviews</button>
                            </Link>
                            : 
                            <Link to='/login'>
                                <button className='btn btn-secondary btn-lg'>Log In / Sign Up</button>
                            </Link>
                        }
                    </div>
                    <div>
                        <Link to='/courses'>
                            <button className='btn btn-secondary btn-lg'>Explore Courses</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main 