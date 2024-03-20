import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Job from './models/JobModel.js';
import User from './models/UserModel.js';
dotenv.config();

try {
	await mongoose.connect(process.env.MONGO_URI);
	const user = await User.findOne({ email: 'test@gmail.com' });
	const jsonJobs = JSON.parse(await readFile(new URL('./utils/mockData.json', import.meta.url)));
	const jobs = jsonJobs.map((job) => {
		return { ...job, createdBy: user._id };
	});
	await Job.deleteMany({ createdBy: user._id });
	await Job.create(jobs);
} catch (error) {
	console.log(error);
	process.exit(1);
}
