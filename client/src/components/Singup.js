import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import React from 'react'

function Signup({ onLogIn }) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    let navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        let signupInput = {
            name: name,
            email: email,
            password: password,
            image: image
        }
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(signupInput)
        })
            .then(res => {
                if(res.ok) {
                    res.json()
                    .then(newUser => onLogIn(newUser))
                    .then(() => navigate('/'))
                } else {
                    res.json()
                    .then(errorObj => alert(errorObj.error))
                }
            })
        // setName("")
        // setEmail("")
        // setPassword("")
        // setImage("")
    }

    return (
        <div>
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group row mx-5 my-2'>
                    <label className='col-sm-2 col-form-label' htmlFor="name">Username</label>
                    <div className='col-sm-8'>
                        <input 
                            className='form-control'
                            required 
                            type="text" 
                            name="name" 
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                </div>
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
                <div className='form-group row mx-5 my-2'>
                    <label className='col-sm-2 col-form-label' htmlFor="image">Profile Picture</label>
                    <div className='col-sm-8'>
                        <input 
                            className='form-control'
                            required 
                            type="text" 
                            name="image" 
                            value={image}
                            onChange={e => setImage(e.target.value)}
                            />
                            </div>
                        </div>
                        <button className='btn btn-secondary' type="submit">Create Account</button>
                    </form>
                    <br/>
                    <div>
                        Already have an account? <NavLink exact to='/'>Log in here!</NavLink>
                    </div>
                </div>
            )
        }

export default Signup 