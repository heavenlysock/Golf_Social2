import './App.css';
import {  useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDetail from './components/UserDetail';
import CourseDetail from './components/CourseDetail';
import CourseList from './components/CourseList';
import ReviewList from './components/ReviewList';
import UserList from './components/UserList';
import NavBar from './components/NavBar';
import FriendshipList from './components/FriendshipList';
import { UserContext } from '../src/context/UserContext';
// import Weather from './components/Weather';

function App() {

  const {currentUser, setCurrentUser} = useContext(UserContext);

  // const [weather, setWeather] = useState(null);

  // useEffect(() => {
  //   fetch('https://api.open-meteo.com/v1/forecast?latitude=34.05&longitude=-118.24&hourly=temperature_2m,rain&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&forecast_days=1&timezone=America%2FLos_Angeles')
  //     .then(response => response.json())
  //     .then(data => setWeather(data));
  // }, []);

  function onLogIn(loggedInUser) {
    setCurrentUser(loggedInUser);
  }

  function onLogOut() {
    setCurrentUser(null);
  }

  function onShowDetails(individual) {
    setCurrentUser(individual);
  }

  function onDeleteUser() {
    setCurrentUser(null);
  }

  if (!currentUser)
    return (
      <Routes>
        <Route
          exact
          path="/"
          element={<Login onLogIn={onLogIn} setCurrentUser={setCurrentUser} />}
        />
        <Route exact path="/signup" element={<Signup onLogIn={onLogIn} />} />
      </Routes>
    );

    return (
      <div className="App">
        <NavBar currentUser={currentUser} onLogOut={onLogOut} />

        <Routes>

          <Route exact path="/" element={<Main />}  />
          
          <Route exact path="/reviews" element={<ReviewList />} />

          <Route exact path="/users" element={<UserList />} />

          <Route exact path="/courses" element={<CourseList />} />

          <Route exact path="/courses/:id" element={<CourseDetail />} />

          <Route exact path="/users/:id" element={<UserDetail />} />

          <Route exact path="/friendships" element={<FriendshipList />} />

        </Routes>

        {/* <Weather weather={weather} getWeather={setWeather} /> */}
      </div>
    );
}

export default App;