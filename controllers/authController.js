import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
import { compareHash, saltPass } from '../uitls/utility.js';
import { UnauthenticatedError } from '../errors/customErrors.js';

const register = async (req, res) => {
	const isFirstAdmin = (await User.countDocuments()) === 0;
	req.body.role = isFirstAdmin ? 'admin' : 'user';

	req.body.password = await saltPass(req.body.password);
	await User.create(req.body);
	res.status(StatusCodes.CREATED).json({ msg: 'User created' });
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	const isValidUser = user && (await compareHash(password, user.password));

	if (!isValidUser) throw new UnauthenticatedError('Password is incorrect');
	res.status(StatusCodes.OK).json('');
};

export { register, login };
