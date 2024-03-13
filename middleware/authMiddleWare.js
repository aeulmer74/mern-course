import { UnauthenticatedError, UnauthorizedError } from '../errors/customErrors.js';
import { verifyJWT } from '../uitls/utility.js';

export const authenticateUser = (req, res, next) => {
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

export const authorizePermissions = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			throw new UnauthorizedError('Not authorized to access this resource');
		}
		next();
	};
};
