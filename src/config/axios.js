import axios from 'axios';

const BE_BASE_URL = process.env.BE_BASE_URL ?? 'http://localhost:2001';

export default axios.create({
    baseURL: BE_BASE_URL
});