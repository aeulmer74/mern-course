import 'express-async-errors';
import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';

import jobRouter from './routers/jobRouter.js';
import { StatusCodes } from 'http-status-codes';

dotenv.config();
const app = express();
const port = process.env.PORT || 5100;

//middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.use(express.json());
app.use('/api/v1/jobs/', jobRouter);

//404 handler
app.use('*', (req, res) => {
	res.status(StatusCodes.NOT_FOUND).json({ message: 'NOT FOUND' });
});

app.use((err, req, res, next) => {
	console.log(err);
	res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something exploded ' });
});

try {
	await mongoose.connect(process.env.MONGO_URI);
	app.listen(port, () => {
		console.log('listening on port', port);
	});
} catch (err) {
	console.log(err);
	process.exit(1);
}
