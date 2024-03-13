import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';

export const getCurrentUser = async (req, res) => {
	let user = await User.findOne({ _id: req.user.userId });
	user = user.toJSON();
	res.status(StatusCodes.OK).json({ message: 'current user', user });
};
export const getApplicationStats = async (req, res) => {
	const users = await User.countDocuments();
	const jobs = await Job.countDocuments();
	res.status(StatusCodes.OK).json({ message: 'app stats', users, jobs });
};
export const updateUser = async (req, res) => {
	const cleanBody = { ...req.body };
	delete cleanBody.password;
	const updatedUser = await User.findOneAndUpdate({ _id: req.user.userId }, cleanBody);
	res.status(StatusCodes.OK).json({ message: 'User updated' });
};
