import axios from 'axios';

const BE_BASE_URL = process.env.REACT_APP_BE_BASE_URL;

export default axios.create({
    baseURL: BE_BASE_URL
});