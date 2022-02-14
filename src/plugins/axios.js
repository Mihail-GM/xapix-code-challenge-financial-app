import axios from 'axios';

let $axios = axios.create({
	baseURL: process.env.VUE_APP_API_BASE_URL,
	headers: {}
});

export default $axios;