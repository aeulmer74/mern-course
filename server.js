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
app.post('/', (req, res) => {
	res.json({ message: 'received', data: req.body });
});

app.get('/api/v1/jobs', (req, res) => {
	res.status(200).json({ jobs });
});

app.post('/api/v1/jobs', (req, res) => {
	const { company, position } = req.body;
	if (!company || !position) {
		return res
			.status(400)
			.json({ message: 'Bad Request, please provide position and company name' });
	}
	const newJob = { id: nanoid(), company, position };
	jobs.push(newJob);
	res.status(201).json({ message: 'new job added', newJob });
});

app.get('/api/v1/jobs/:jobId', (req, res) => {
	const { jobId } = req.params;
	const job = jobs.find((job) => job.id === jobId);
	if (!job) {
		throw new Error('No job with matching ID found');
		// return res.status(404).json({ message: 'not found' });
	}
	res.status(200).json({ job });
});

app.patch('/api/v1/jobs/:jobId', (req, res) => {
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
});

app.delete('/api/v1/jobs/:jobId', (req, res) => {
	const { jobId } = req.params;
	const newJobs = jobs.filter((job) => job.id !== jobId);
	if (!newJobs) {
		throw new Error('No job with matching ID found');
		// return res.status(404).json({ message: 'not found' });
	}
	jobs = [...newJobs];
	res.status(200).json({ jobs });
});

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
