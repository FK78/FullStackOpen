import axios from 'axios';
const baseURL = 'http://localhost:3001/persons';

const getAllEntries = () => {
    const request = axios.get(baseURL);
    return request.then((response) => response.data);
}

const createEntry = (newData) => {
    const request = axios.post(baseURL, newData);
    return request.then((response) => response.data);
}

export default {
    getAllEntries,
    createEntry,
}