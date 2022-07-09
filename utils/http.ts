import axios from 'axios';

const instance = axios.create({
  timeout: 10e3,
});

export default instance;
