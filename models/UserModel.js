import mongoose from 'mongoose';
import { USER_ROLES } from '../utils/constants.js';

const UserSchema = new mongoose.Schema({
	firstName: String,
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
	avatar: String,
	avatarPublicId: String,
});

UserSchema.methods.toJSON = function () {
	let obj = this.toObject();
	delete obj.password;
	return obj;
};

export default mongoose.model('User', UserSchema);
