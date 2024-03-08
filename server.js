import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import { nanoid } from 'nanoid';
dotenv.config();

const app = express();
const port = process.env.PORT || 5100;

//data
let jobs = [
	{ id: nanoid(), company: 'travelers', position: 'SWE 1' },
	{ id: nanoid(), company: 'liberty', position: 'SWE 2' },
];

//middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.use(express.json());

//routes
app.get('/', (req, res) => {
	res.send('HELLO YOU');
});

app.post('/', (req, res) => {
	res.json({ message: 'received', data: req.body });
});

app.get('/api/v1/jobs', (req, res) => {
	res.status(200).json({ jobs });
});

//LISTENING
app.listen(port, () => {
	console.log('listening on port', process.env.PORT);
});
