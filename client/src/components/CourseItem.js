import { NavLink } from 'react-router-dom'

function CourseItem({ course }) {
    return(
        <div className="card-deck col-sm-3 my-3">
                <NavLink to={`/courses/${course.id}`}>
                    <div class="card-columns">
                        <div class="card text-white hover">
                            <img className="card-img" alt="Course" src={course.img_url}/>
                            <div class="card-img-overlay overlay">
                                <h3 className='card-title overlay'>
                                    {course.name}
                                    {course.par} 
                                    {course.description} 
                                    {course.features} </h3>
                            </div>
                        </div>
                    </div>
                </NavLink>
        </div>
    )
}

export default CourseItem