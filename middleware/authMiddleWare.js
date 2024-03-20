import {
	BadRequestError,
	UnauthenticatedError,
	UnauthorizedError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/utility.js';

export const authenticateUser = (req, res, next) => {
	const { login_token } = req.cookies;
	if (!login_token) throw new UnauthenticatedError('You must login to access this resource');
	try {
		const { userId, role } = verifyJWT(login_token);
		const testUser = userId === '65fb13a893a494be3a953d0c';
		req.user = { userId, role, testUser };
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

export const checkTestUser = (req, res, next) => {
	if (req.user.testUser) throw new BadRequestError('Demo user, no access');
	next();
};
