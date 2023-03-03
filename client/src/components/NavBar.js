import { NavLink, useNavigate } from "react-router-dom";
import React from 'react'

const NavBar = ({ currentUser, onLogOut }) => {
    const navigate = useNavigate();

    function handleLogOut() {
        fetch('/logout', {
            method: 'DELETE',
        }).then(() => {
          onLogOut();
          navigate('/');
        });
      }
    

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
            <NavLink className="navbar-name" exact to="/">
                Review Now
            </NavLink>
            <div className="navbar-nav">
                <NavLink className="nav-link" to="/courses">
                Courses
                </NavLink>
                <NavLink className="nav-link" to="/reviews">
                Reviews
                </NavLink>
                {currentUser ? (
                <>
                    <NavLink className="nav-link" to="/users">
                    Reviewers
                    </NavLink>
                    <button className="nav-link" onClick={handleLogOut}>
                    Log Out
                    </button>
                </>
                ) : (
                <NavLink className="nav-link" to="/login">
                    Log In / Register
                </NavLink>
                )}
            </div>
            {currentUser ? (
                <p className="navbar-text">Signed in as {currentUser.name}</p>
            ) : null}
            </div>
        </nav>
        )
    }


export default NavBar