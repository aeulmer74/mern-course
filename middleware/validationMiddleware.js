import { body, validationResult, param } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE, USER_ROLES } from '../uitls/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';

const withValidationErrors = (validatedValues) => {
	return [
		validatedValues,
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const errorMessages = errors.array().map((err) => err.msg);
				if (errorMessages[0].startsWith('No job')) {
					throw new NotFoundError(errorMessages);
				}
				if (errorMessages[0].startsWith('Not authorized')) {
					throw new UnauthorizedError(errorMessages);
				}
				throw new BadRequestError(errorMessages);
			}
			next();
		},
	];
};

export const validateJob = withValidationErrors([
	body('position').notEmpty().withMessage('Position is required'),
	body('company').notEmpty().withMessage('Company is required'),
	body('jobLocation').notEmpty().withMessage('Job location is required'),
	body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('Invalid job status value'),
	body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('Invalid job type value'),
]);

export const validateIdParam = withValidationErrors([
	param('jobId').custom(async (value, req) => {
		const isAdmin = req.user.role === 'admin';
		const isOwner = req.user.userId === job.createdBy.toString();
		const isValidId = mongoose.Types.ObjectId.isValid(value);
		if (!isValidId) throw new BadRequestError('MongoId is invalid');
		const job = await Job.findById(value);
		if (!job) throw new NotFoundError(`No job found with ${value}`);
		if (!isAdmin && !isOwner) {
			throw new UnauthorizedError('Not authorized to access this resource');
		}
	}),
]);

export const validateUser = withValidationErrors([
	body('firstName').notEmpty().withMessage('First name is required'),
	body('lastName').notEmpty().withMessage('Last name is required'),
	body('password')
		.notEmpty()
		.withMessage('Password is required')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters'),
	body('location').notEmpty().withMessage('Location is required'),
	body('email')
		.notEmpty()
		.withMessage('email is required')
		.isEmail()
		.withMessage('Email is invalid')
		.custom(async (email) => {
			const user = await User.findOne({ email });
			if (user) throw new BadRequestError(`Email is already in use`);
		}),
]);

export const validateLogin = withValidationErrors([
	body('password').notEmpty().withMessage('Password is required'),
	body('email')
		.notEmpty()
		.withMessage('email is required')
		.isEmail()
		.withMessage('Email is invalid'),
]);

export const validateUpdateUser = withValidationErrors([
	body('name').notEmpty().withMessage('First name is required'),
	body('lastName').notEmpty().withMessage('Last name is required'),
	body('location').notEmpty().withMessage('Location is required'),
	body('email')
		.notEmpty()
		.withMessage('email is required')
		.isEmail()
		.withMessage('Email is invalid')
		.custom(async (email, { req }) => {
			const user = await User.findOne({ email });
			if (user && user._id.toString() !== req.user.userId) {
				throw new BadRequestError(`Email is already in use`);
			}
		}),
]);
