import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import React from 'react'


function Login({ onLogIn, setCurrentUser}) {

    let navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    function handleSubmit(e) {
        e.preventDefault()
        let loginInput = {
            email: email,
            password: password
        }

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(loginInput)
        })
            .then(response => {
                if (response.status === 200) {
                    response.json().then(loggedInUser => {
                        setCurrentUser(loggedInUser);
                        navigate("/")
                    })
                }
            })

        setEmail("")
        setPassword("")
    }

    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group row mx-5 my-2'>
                    <label className='col-sm-2 col-form-label' htmlFor="email">Email</label>
                    <div className='col-sm-8'>
                        <input 
                            className='form-control'
                            required 
                            type="text" 
                            name="email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className='form-group row mx-5 my-2'>
                    <label className='col-sm-2 col-form-label' htmlFor="password">Password</label>
                    <div className='col-sm-8'>
                        <input 
                            className='form-control'
                            required 
                            type="password" 
                            name="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                {/* <input type="checkbox" onClick={showPassword}>Show Password</input> */}
                <button className='btn btn-secondary' type="submit">Log In</button>
            </form>
            <br/>
            <div>
                Want to check out golf courses? <Link exact to='/signup'>Sign up here!</Link>
            </div>
        </div>
    )
}

export default Login 