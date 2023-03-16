import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Weather from './Weather';

function Main() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <div className='main-container'>
      <img
        className='main-image'
        src='https://media.istockphoto.com/id/136546200/vector/golf-grunge-background.jpg?s=612x612&w=0&k=20&c=Q13lUna2_UcgTGQpTc628vydJCETLdqsC7ae97JtJ88='
        alt='background_img'
      />
        <br />
       
      <div className='main-text'>
        <h1>Golf Course Reviews</h1>
        <h3>
          {currentUser
            ? `Welcome, ${currentUser.name}!`
            : 'for information on the best courses near you and around the world'}
         </h3>
        <br />
        <br />
      </div>
      <div className="weather-container">
        <Weather />
      </div>
  
    </div>
  );
}

export default Main;




//     {/* <div>
//           <div>
//             {currentUser ? (
//               <NavLink to='/reviews'>
//                 <button className='btn btn-secondary btn-lg'>
//                   Check Out Reviews
//                 </button>
//               </NavLink>
//             ) : (
//               <NavLink to='/login'>
//                 <button className='btn btn-secondary btn-lg'>
//                   Log In / Sign Up
//                 </button>
//               </NavLink>
//             )}
//           </div>
//           <div>
//             <NavLink to='/courses'>
//               <button className='btn btn-secondary btn-lg'>
//                 Explore Courses
//               </button>
//             </NavLink>
//           </div>
//         </div> */}