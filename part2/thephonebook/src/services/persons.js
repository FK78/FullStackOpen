import axios from 'axios';
const baseURL = '/api/persons';

const getAllEntries = () => {
    const request = axios.get(baseURL);
    return request.then((response) => response.data);
}

const createEntry = (newData) => {
    const request = axios.post(baseURL, newData);
    return request.then((response) => response.data);
}

const deleteEntry = (id) => {
    const request = axios.delete(`${baseURL}/${id}`);
    return request.then((response) => response.data)
}

const updateEntry = (id, newData) => {
    const request = axios.put(`${baseURL}/${id}`, newData);
    return request.then((response) => response.data);
}

export default {
    getAllEntries,
    createEntry,
    deleteEntry,
    updateEntry,
}