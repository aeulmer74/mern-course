import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';
import { promises as fs } from 'fs';
import cloudinary from 'cloudinary';

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
	const newUser = { ...req.body };
	delete newUser.password;

	if (req.file) {
		const response = await cloudinary.v2.uploader.upload(req.file.path); //upload to cloud
		await fs.unlink(req.file.path); //remove file
		newUser.avatar = response.secure_url;
		newUser.avatarPublicId = response.public_id;
	}
	const updatedUser = await User.findOneAndUpdate({ _id: req.user.userId }, newUser);

	if (req.file && updatedUser.avatarPublicId) {
		await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
	}

	res.status(StatusCodes.OK).json({ message: 'User updated' });
};
