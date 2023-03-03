import './App.css';
import { useState, useEffect} from 'react';
import { Routes , Route } from 'react-router-dom'
import Main from './components/Main';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDetail from './components/UserDetail';
import CourseDetail from './components/CourseDetail';
import CourseList from './components/CourseList';
import ReviewList from './components/ReviewList';
import UserList from './components/UserList';
import NavBar from './components/NavBar';
import React from 'react';

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  console.log(currentUser)
  const [displayInfo, setDisplayInfo] = useState(null)

  


  useEffect(() => {
    fetch('/me')
      .then(response => {
        if(response.ok) {
          response.json()
          .then((user) => setCurrentUser(user))
        } else{
          setCurrentUser(null)
        }
      })

  }, [])


  function onLogIn(loggedInUser) {
    setCurrentUser(loggedInUser)

  }

  function onLogOut(){
    setCurrentUser(null)
  }

  function onShowDetails(individual) {
    setDisplayInfo(individual)
  }

  function onDeleteUser() {
    setCurrentUser(null)
    setDisplayInfo(null)
  }

  if(!currentUser) return (
    <Routes>
      {/* <Route path='/' element={<Welcome/>}/> */}
      <Route exact path='/' element={<Login onLogIn={onLogIn} setCurrentUser={setCurrentUser}  />} />
      <Route exact path='/signup' element={<Signup onLogIn={onLogIn} />} />
    </Routes>
  )

  return (
    <div className="App">
      <NavBar
        currentUser={currentUser}
        onLogOut={onLogOut}
        />
        <Routes>
          <Route exact path="/" element={<Main />} />

          <Route exact path="/reviews" element={<ReviewList />} />

          <Route exact path="/users" element={<UserList />} />


          <Route exact path="/courses" element={<CourseList />} />

          <Route exact path='/courses/:id' element={<CourseDetail onShowDetails={onShowDetails} displayInfo={displayInfo} currentUser={currentUser} onDeleteUser={onDeleteUser} />} />

          <Route exact path='/users/:id' element={<UserDetail onShowDetails={onShowDetails} displayInfo={displayInfo} currentUser={currentUser} onDeleteUser={onDeleteUser} />} />

          
        </Routes>
      
    </div>
  );
}

export default App;
