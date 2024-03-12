import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';

const register = async (req, res) => {
	const newUser = await User.create(req.body);
	res.status(StatusCodes.CREATED).json({ msg: 'Success', newUser });
};

const login = async (req, res) => {
	res.status(StatusCodes.OK).json('');
};

export { register, login };
