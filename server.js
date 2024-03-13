import 'express-async-errors';
import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import userRouter from './routers/userRouter.js';
import jobRouter from './routers/jobRouter.js';
import authRouter from './routers/authRouter.js';
import { NotFoundError } from './errors/customErrors.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleWare.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5100;

//middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/jobs/', authenticateUser, jobRouter);
app.use('/api/v1/users/', authenticateUser, userRouter);
app.use('/api/v1/auth/', authRouter);

//404 handler
app.use('*', (req, res) => {
	throw new NotFoundError('Not Found');
});

app.use(errorHandlerMiddleware);

try {
	await mongoose.connect(process.env.MONGO_URI);
	app.listen(port, () => {
		console.log('listening on port', port);
	});
} catch (err) {
	console.log(err);
	process.exit(1);
}
