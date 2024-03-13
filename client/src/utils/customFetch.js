import axios from 'axios';

const myAxios = axios.create({
	baseURL: '/api/v1',
});

export default myAxios;
