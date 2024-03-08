import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();

const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());

//routes
app.get('/', (req, res) => {
	res.send('HELLO YOU');
});

app.post('/', (req, res) => {
	res.json({ message: 'received', data: req.body });
});

app.listen(process.env.PORT, () => {
	console.log('listening on port', process.env.PORT);
});
