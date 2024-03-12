import mongoose from 'mongoose';
import { USER_ROLES } from '../uitls/constants.js';

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	lastName: {
		type: String,
		default: 'lastName',
	},
	location: {
		type: String,
		default: 'earth',
	},
	role: {
		type: String,
		enum: Object.values(USER_ROLES),
		default: USER_ROLES.USER,
	},
});

export default mongoose.model('User', UserSchema);
