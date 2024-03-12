import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Password
export const saltPass = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPass = await bcrypt.hash(password, salt);
	return hashedPass;
};

export const compareHash = async (given, stored) => {
	const isMatch = await bcrypt.compare(given, stored);
	return isMatch;
};

//Tokens
export const createJWT = (payload) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
	return token;
};

export const verifyJWT = (token) => {
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	console.log(decoded);
	return decoded;
};
