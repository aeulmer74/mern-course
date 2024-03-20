import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';

//C
export const addJob = async (req, res) => {
	req.body.createdBy = req.user.userId;
	const newJob = await Job.create(req.body);
	res.status(StatusCodes.CREATED).json({ message: 'new job added', newJob });
};

//R
export const getAllJobs = async (req, res) => {
	const jobs =
		req.user.role === 'admin'
			? await Job.find()
			: await Job.find({ createdBy: req.user.userId });
	res.status(StatusCodes.OK).json({ jobs });
};

export const getJob = async (req, res) => {
	const job = await Job.findById(req.params.jobId);
	res.status(StatusCodes.OK).json({ msg: 'Success', job });
};

//U
export const updateJob = async (req, res) => {
	const job = await Job.findByIdAndUpdate({ _id: req.params.jobId }, req.body, { new: true });
	res.status(StatusCodes.OK).json({ msg: `Job ${req.params.jobId} updated`, updatedJob: job });
};

//D
export const deleteJob = async (req, res) => {
	const removedJob = await Job.findByIdAndDelete(req.params.jobId);
	res.status(StatusCodes.OK).json({ job: removedJob });
};
