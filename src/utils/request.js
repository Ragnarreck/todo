import axios from 'axios';

const request = axios.create({
    baseURL: 'http://192.168.137.1:8080'
});

export default request;