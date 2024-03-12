import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
import { saltPass } from '../uitls/utility.js';

const register = async (req, res) => {
	const isFirstAdmin = (await User.countDocuments()) === 0;
	req.body.role = isFirstAdmin ? 'admin' : 'user';

	req.body.password = await saltPass(req.body.password);
	await User.create(req.body);
	res.status(StatusCodes.CREATED).json({ msg: 'User created' });
};

const login = async (req, res) => {
	res.status(StatusCodes.OK).json('');
};

export { register, login };
