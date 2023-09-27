/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import weatherService from "../services/weather";
import Weather from "./Weather";

const Country = ({ singleCountry }) => {
  const [countryWeather, setCountryWeather] = useState([]);
  const languages = Object.values(singleCountry.languages);

  useEffect(() => {
    weatherService.getCountryWeather(singleCountry.capital).then((re) => {
      setCountryWeather({
        temp: re.main.temp,
        windSpeed: re.wind.speed,
        icon: re.weather[0].icon,
      });
    });
  }, [singleCountry.capital]);

  return (
    <div>
      <h1>{singleCountry.name}</h1>
      <p>
        Capital: {singleCountry.capital}
        <br />
        Area: {singleCountry.area}
      </p>
      <h2>Languages:</h2>
      <ul>
        {languages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={singleCountry.flag} alt="country flag"></img>
      <Weather capital={singleCountry.capital} weatherData={countryWeather} />
    </div>
  );
};

export default Country;
