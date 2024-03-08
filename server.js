import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();

const app = express();
const port = process.env.PORT || 5100;

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

app.listen(port, () => {
	console.log('listening on port', process.env.PORT);
});
