import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const makeRequest = axios.create({
  baseURL: BASE_URL
});
