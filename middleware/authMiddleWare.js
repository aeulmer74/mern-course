import { UnauthenticatedError } from '../errors/customErrors.js';
import { verifyJWT } from '../uitls/utility.js';

export const authenticateUser = async (req, res, next) => {
	const { login_token } = req.cookies;
	if (!login_token) throw new UnauthenticatedError('You must login to access this resource');
	try {
		const { userId, role } = verifyJWT(login_token);
		req.user = { userId, role };
		next();
	} catch (e) {
		throw new UnauthenticatedError('You must login to access this resource');
	}
};
