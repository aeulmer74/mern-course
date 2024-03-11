import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 5100;

//routers
import jobRouter from './routers/jobRouter.js';

//middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.use(express.json());
app.use('/api/v1/jobs/', jobRouter);

//404 handler
app.use('*', (req, res) => {
	res.status(404).json({ message: 'NOT FOUND' });
});

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ message: 'Something exploded ' });
});

//LISTENING
app.listen(port, () => {
	console.log('listening on port', process.env.PORT);
});
