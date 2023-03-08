import { useState } from 'react'
import React from 'react';

function CourseForm({ onSubmitNewCourse }) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [par, setPar] = useState("")
    const [features, setFeatures] = useState("")
    const [img_url, setImg_url] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        let courseInput = {
            name: name,
            par: par,
            description: description,
            features: features,
            img_url: img_url
        }

        fetch('/courses', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(courseInput)
        })
            .then(response => {
                if(response.ok) {
                    response.json()
                    .then(newCourse => onSubmitNewCourse(newCourse))
                }
                alert('Course successfully added!')
            })
        setName("")
        setDescription("")
        setFeatures("")
        setPar("")
        setImg_url("")
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-group row mx-5 my-2'>
                    <label className='col-sm-2 col-form-label' htmlFor="name">Name</label>
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
                    <label className='col-sm-2 col-form-label' htmlFor="par">Par</label>
                    <div className='col-sm-8'>
                        <input  
                            className='form-control'
                            type="text" 
                            name="par" 
                            value={par}
                            onChange={e => setPar(e.target.value)}
                        />
                    </div>
                </div>
                <div className='form-group row mx-5 my-2'>
                    <label className='col-sm-2 col-form-label' htmlFor="description">description</label>
                    <div className='col-sm-8'>
                        <input
                            className='form-control'
                            required
                            type="text" 
                            name="description" 
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className='form-group row mx-5 my-2'>
                    <label className='col-sm-2 col-form-label' htmlFor="features">Features</label>
                    <div className='col-sm-8'>
                        <input
                            className='form-control'
                            type="text" 
                            name="features" 
                            value={features}
                            onChange={e => setFeatures(e.target.value)}
                        />
                    </div>
                </div>
                <div className='form-group row mx-5 my-2'>
                    <label className='col-sm-2 col-form-label' htmlFor="Image">Image</label>
                    <div className='col-sm-8'>
                        <input
                            className='form-control'
                            type="text" 
                            name="image_url" 
                            value={img_url}
                            onChange={e => setImg_url(e.target.value)}
                        />
                    </div>
                </div>
                <button className='btn btn-secondary' type="submit">Add Course</button>
            </form>
        </div>
    )
}

export default CourseForm