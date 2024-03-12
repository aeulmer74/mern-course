import { UnauthenticatedError } from '../errors/customErrors.js';

export const authenticateUser = async (req, res, next) => {
	const { login_token } = req.cookies;
	if (!login_token) throw new UnauthenticatedError('You must login to access this resource');
	next();
};
