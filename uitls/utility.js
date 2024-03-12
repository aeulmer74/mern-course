import bcrypt from 'bcryptjs';

export const saltPass = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPass = await bcrypt.hash(password, salt);
	return hashedPass;
};

export const compareHash = async (given, stored) => {
	const isMatch = await bcrypt.compare(given, stored);
	return isMatch;
};
