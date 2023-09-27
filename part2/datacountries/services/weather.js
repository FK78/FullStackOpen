import axios from 'axios'
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q='
const api_key = import.meta.env.VITE_SOME_KEY

const getCountryWeather = (cityName) => {
    const request = axios.get(`${baseURL}${cityName}&units=metric&appid=${api_key}`)
    return request.then((response) => response.data)
}

export default {
    getCountryWeather,
}