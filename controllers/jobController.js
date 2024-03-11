import { nanoid } from 'nanoid';
//data
let jobs = [
	{ id: nanoid(), company: 'travelers', position: 'SWE 1' },
	{ id: nanoid(), company: 'liberty', position: 'SWE 2' },
];

//C
export const addJob = async (req, res) => {
	const { company, position } = req.body;
	if (!company || !position) {
		return res
			.status(400)
			.json({ message: 'Bad Request, please provide position and company name' });
	}
	const newJob = { id: nanoid(), company, position };
	jobs.push(newJob);
	res.status(201).json({ message: 'new job added', newJob });
};

//R
export const getAllJobs = async (req, res) => {
	console.log('is hit?');
	res.status(200).json({ jobs });
};

export const getJob = async (req, res) => {
	const { jobId } = req.params;
	const job = jobs.find((job) => job.id === jobId);
	if (!job) {
		throw new Error('No job with matching ID found');
		// return res.status(404).json({ message: 'not found' });
	}
	res.status(200).json({ job });
};

//U
export const updateJob = async (req, res) => {
	const { jobId } = req.params;
	const { company, position } = req.body;
	if (!company || !position) {
		return res
			.status(400)
			.json({ message: 'Bad Request, please provide position and company name' });
	}
	const job = jobs.find((job) => job.id === jobId);
	if (!job) {
		throw new Error('No job with matching ID found');
		// return res.status(404).json({ message: 'not found' });
	}
	job.company = company;
	job.position = position;
	res.status(200).json({ job });
};

//D
export const deleteJob = async (req, res) => {
	const { jobId } = req.params;
	const newJobs = jobs.filter((job) => job.id !== jobId);
	if (!newJobs) {
		throw new Error('No job with matching ID found');
		// return res.status(404).json({ message: 'not found' });
	}
	jobs = [...newJobs];
	res.status(200).json({ jobs });
};
