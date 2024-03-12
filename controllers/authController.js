import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
import { compareHash, createJWT, saltPass } from '../uitls/utility.js';
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

	const oneDay = 1000 * 60 * 60 * 24;
	const token = createJWT({ userId: user._id, role: user.role });

	res.cookie('login_token', token, {
		httpOnly: true,
		expires: new Date(Date.now() + oneDay),
		secure: process.env.NODE_ENV === 'production',
	});
	res.status(StatusCodes.OK).json({ msg: 'login successful' });
};

export { register, login };
