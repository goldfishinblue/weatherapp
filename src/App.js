import React, { useState, useEffect } from "react";
import "./App.css";


const API_KEY = "18f5f2826af2d65651532c718dc303e5";
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;

// const FetchWeather = async (city) => {
//   try {
//     const response = await fetch(BASE_URL + '&q=' + city);
//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     }
//   } catch (error) {
//     console.log(error);
//     alert('Enter valid city name');
//     return [];
//   }
// };

// function History() {
//   // const data = localStorage.getItem("city")?.split(",");
//   const data = JSON.parse(localStorage.getItem("city"));
//   const performSearch = (city) => {

//   }

//   // console.log(data)
//   return (

//   );
// }

function WeatherInfo({ info }) {
  if (info) {
    return (
      <div className="weather-info">
        <div className="name">
          <div>{info.name}</div>
          <div>{info.sys.country}</div>
        </div>
        <div className="des">
          <div>{info.weather[0].description}</div>
          <div>{info.main.temp} degrees celsius</div>
        </div>
      </div>
    );
  }
  return <></>;
}

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      if (!searchCity) return;
      setLoading(true);
      try {
        const response = await fetch(BASE_URL + "&q=" + searchCity);
        const data = await response.json();
        if (response.ok) {
          setErrorMessage("");
          setWeatherInfo(
            data
            //     data.name
            // data.sys.country
            // data.weather[0].description
            // data.main.temp
          );
          const oldData = JSON.parse(localStorage.getItem("city")) || [];
          if (!oldData.includes(searchCity)) {
            const newData = [...oldData, searchCity];
            localStorage.setItem("city", JSON.stringify(newData));
          }
          // localStorage.setItem("city", newData);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeather();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput.toLowerCase());
  };

  return (
    <>
      <div className="container">
        <h1 className="title">Another Weather App</h1>
        <h1 className="icon">🔆 🌧 🌨 🌬 🌦</h1>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {errorMessage ? (
              <div className="error" style={{ color: "red" }}>
                {errorMessage}
              </div>
            ) : (
              <WeatherInfo info={weatherInfo} />
            )}
          </>
        )}
        <form onSubmit={handleSubmit} className="search-box">
          <input
            className="input"
            type="text"
            placeholder="Search City..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          ></input>
          <button className="search-button">Search</button>
        </form>
        <span className="history">
          ➤ Current Location:
          <br />
          <br />
          <div>
            {JSON.parse(localStorage.getItem("city"))?.map((city) => (
              <button
                onClick={() => setSearchCity(city)}
                className="search-city"
              >
                {city}
              </button>
            ))}
          </div>
        </span>
      </div>
    </>
  );
}

export default App;
