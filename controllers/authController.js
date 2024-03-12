import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';

const register = async (req, res) => {
	res.status(StatusCodes.CREATED).json('');
};

const login = async (req, res) => {
	res.status(StatusCodes.OK).json('');
};

export { register, login };
