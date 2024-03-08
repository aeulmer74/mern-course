import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

//routes
app.get('/', (req, res) => {
	console.log('listening');
});

app.listen(process.env.PORT, () => {
	console.log('listening on port', process.env.PORT);
});
