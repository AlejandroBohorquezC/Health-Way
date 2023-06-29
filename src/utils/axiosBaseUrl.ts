import axios from 'axios';

export const baseURL = axios.create({
    baseURL: `https://api.edamam.com/api/recipes`,
});
