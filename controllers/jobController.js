import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';

//C
export const addJob = async (req, res) => {
	const newJob = await Job.create(req.body);
	res.status(StatusCodes.CREATED).json({ message: 'new job added', newJob });
};

//R
export const getAllJobs = async (req, res) => {
	const jobs = await Job.find();
	res.status(StatusCodes.OK).json({ jobs });
};

export const getJob = async (req, res) => {
	const { jobId } = req.params;
	const job = await Job.findById(jobId);
	if (!job) throw new NotFoundError(`no job found with ${jobId}`);
	res.status(StatusCodes.OK).json({ msg: 'Success', job });
};

//U
export const updateJob = async (req, res) => {
	const { jobId } = req.params;
	const job = await Job.findByIdAndUpdate({ _id: jobId }, req.body, { new: true });
	if (!job) throw new NotFoundError(`no job found with ${jobId}`);
	res.status(StatusCodes.OK).json({ msg: `Job ${jobId} updated`, updatedJob: job });
};

//D
export const deleteJob = async (req, res) => {
	const { jobId } = req.params;
	console.log('here');
	const removedJob = await Job.findByIdAndDelete(jobId);
	if (!removedJob) throw new NotFoundError(`no job found with ${jobId}`);
	res.status(StatusCodes.OK).json({ job: removedJob });
};
