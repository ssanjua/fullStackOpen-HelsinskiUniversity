import { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherInfo({ countryData }) {
  const [weatherObj, setWeatherObj] = useState("");
  const [lat, lon] = countryData.capitalInfo.latlng;
  useEffect(() => {
    const uri = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&units=metric`;
    axios.get(uri).then((res) => setWeatherObj(res.data));
  }, []);

  return (
    !!weatherObj && (
      <>
        <h2>Weather in {countryData.capital[0]}</h2>
        <p>temperature {weatherObj.main.temp} &#176;C</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`}
        />
        <p>Wind {weatherObj.wind.speed} m/s</p>
      </>
    )
  );
}