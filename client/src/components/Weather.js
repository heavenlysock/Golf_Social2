import React, { useState } from "react";

function Weather() {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [temperature, setTemperature] = useState("");
  const [rain, setRain] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!longitude || !latitude) {
      // If either longitude or latitude is not provided, set default location to Los Angeles
      setLongitude("-118.2437");
      setLatitude("34.0522");
    } else {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&daily=sunrise,sunset,precipitation_sum,rain_sum&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&forecast_days=1&timezone=America%2FLos_Angeles`;
      
      return fetch(url)
        .then((res) => res.json())
        .then((data) => {
          
          setTemperature(data.hourly.temperature_2m[0]);
          setRain(data.daily.precipitation_sum[0]);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleCurrentPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
      function (position) {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
      },
      function (error) {
        console.error(
          console.error(error)
        );
      }
    );
    } else {
      alert("Default position is not available")
    }
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Longitude:
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
        <label>
          Latitude:
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>
        <button type="submit">Get Weather</button>
      </form>
      <button onClick={handleCurrentPosition}>Use My Current Position</button>
      {temperature && (
        <p>
          The temperature is {temperature} degrees Fahrenheit
        </p>
      )}
      {rain > 0 && <p>The precipitation is {rain} inches</p>}
    </div>
  );
}

export default Weather;























// import React, { useState } from "react";

// function Weather() {
//   const [longitude, setLongitude] = useState("");
//   const [latitude, setLatitude] = useState("");
//   const [temperature, setTemperature] = useState("");
//   const [description, setDescription] = useState("");
//   const [rain, setRain] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (!longitude || !latitude) {
//       // If either longitude or latitude is not provided, set default location to Los Angeles
//       setLongitude("-118.2437");
//       setLatitude("34.0522");
//     }
//     else {
//       const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&daily=sunrise,sunset,precipitation_sum,rain_sum&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&forecast_days=1&timezone=America%2FLos_Angeles`;
//       fetch(url)
//         .then((res) => res.json())
//         .then((data) => {
//           setTemperature(data.hourly.temperature_2m[0].value);
//           setDescription(data.hourly.weathercode[0].description);
//           setRain(data.hourly.precipitation[0].value);
//         })
//         .catch((error) => console.log(error));
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Longitude:
//           <input
//             type="text"
//             value={longitude}
//             onChange={(e) => setLongitude(e.target.value)}
//           />
//         </label>
//         <label>
//           Latitude:
//           <input
//             type="text"
//             value={latitude}
//             onChange={(e) => setLatitude(e.target.value)}
//           />
//         </label>
//         <button type="submit">Get Weather</button>
//       </form>
//       {temperature && (
//         <p>
//           The temperature is {temperature} degrees Fahrenheit and {description}
//         </p>
//       )}
//       {rain && <p>The precipitation is {rain} inches</p>}
//     </div>
//   );
// }

// export default Weather;