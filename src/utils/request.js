import axios from 'axios';

const request = axios.create({
    baseURL: 'http://159.224.33.254:8080'
});

export default request;