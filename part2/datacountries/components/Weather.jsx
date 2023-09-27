/* eslint-disable react/prop-types */

const Weather = ({ capital, weatherData }) => {
  const weatherURL = "https://openweathermap.org/img/wn/";

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature {weatherData.temp}°C</p>
      <img src={`${weatherURL}${weatherData.icon}@2x.png`} alt="weather icon" />
      <p>Wind speed {weatherData.windSpeed} m/s</p>
    </div>
  );
};

export default Weather;
