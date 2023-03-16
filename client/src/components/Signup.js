import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import React from 'react'

function Signup({ onLogIn, user, setUser }) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [avatar, setAvatar] = useState("")
    const [avatarData, setAvatarData] = useState("")
    
    let navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        let signupInput = {
            name: name,
            email: email,
            password: password
            // avatar: avatar
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

    // const handleUpdateUser = async (e) => {
    //     e.preventDefault()
    //     const formData = new FormData()
    //     formData.append('img', avatarData)
    //     formData.append('user_id', user.id)
    //     const response = await fetch(`/avatars/${user.avatar.id}`, {
    //         method: 'PATCH',
    //         body: formData
    //       })
          
    //       const data = await response.json()
    //       setUser(data)
          
      
    //     }


    //     fetch(`/users/${user.id}`, {
    //         method: 'PATCH',
    //         body: formData,
    //     })
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((data) => {
    //         if (data.user) {
    //             setUser(data.user);
                
    //         } else {
    //             alert(data.errors);
    //         }
    //     });
    // }


    // let inputRef;
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
                    {/* <form onSubmit={handleUpdateUser}>
                        <label className='col-sm-2 col-form-label' htmlFor="avatar">Avatar</label>
                        <div className='col-sm-8'>
                            <input 
                                className='form-control'
                                required
                                type="file"
                                name="avatar"
                                accept="image/*"
                                ref={refParam => inputRef = refParam}
                                onChange={e => setAvatarData(e.target.files[0])}
                                />
                            <button className='btn btn-secondary' type="submit">Add Avatar</button>
                        </div>
                    </form>     */}
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

export default Signup;