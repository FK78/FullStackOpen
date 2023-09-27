import axios from 'axios';
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAllCountries = () => {
    const request = axios.get(`${baseURL}/all`)
    return request.then((response) => response.data)
}

const searchForCountries = (searchTerm) => {
    const request = axios.get(`${baseURL}/name/${searchTerm}`)
    return request.then((response) => response.data)
}

export default {
    getAllCountries,
    searchForCountries
}