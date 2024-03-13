import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import myAxios from './utils/customFetch.js';

try {
	const res = await myAxios.get('/test');
	console.log(res);
} catch (e) {
	console.log(e);
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
