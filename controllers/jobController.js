import Job from '../models/JobModel.js';

//C
export const addJob = async (req, res) => {
	const newJob = await Job.create(req.body);
	res.status(201).json({ message: 'new job added', newJob });
};

//R
export const getAllJobs = async (req, res) => {
	const jobs = await Job.find();
	res.status(200).json({ jobs });
};

export const getJob = async (req, res) => {
	const { jobId } = req.params;
	const job = await Job.findById(jobId);
	if (!job) {
		return res.status(404).json({ message: `no job found with ${jobId}` });
	}
	res.status(200).json({ msg: 'Success', job });
};

//U
export const updateJob = async (req, res) => {
	const { jobId } = req.params;
	const job = await Job.findByIdAndUpdate({ _id: jobId }, req.body, { new: true });
	if (!job) {
		return res.status(404).json({ message: `no job found with ${jobId}` });
	}
	res.status(200).json({ msg: `Job ${jobId} updated`, updatedJob: job });
};

//D
export const deleteJob = async (req, res) => {
	const { jobId } = req.params;
	const removedJob = Job.findByIdAndDelete(jobId);
	if (!removedJob) {
		return res.status(404).json({ message: `no job found with ${jobId}` });
	}
	res.status(200).json({ job: removedJob });
};
