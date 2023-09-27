/* eslint-disable react/prop-types */

const Weather = ({ capital, weatherData }) => {
  const weatherURL = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature {weatherData.temp}°C</p>
      <img src={weatherURL} alt="weather icon" />
      <p>Wind speed {weatherData.windSpeed} m/s</p>
    </div>
  );
};

export default Weather;
