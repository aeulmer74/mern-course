import { body, validationResult, param } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../uitls/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';

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
	param('jobId').custom(async (value) => {
		const isValidId = mongoose.Types.ObjectId.isValid(value);
		if (!isValidId) throw new BadRequestError('MongoId is invalid');
		const job = await Job.findById(value);
		if (!job) throw new NotFoundError(`No job found with ${value}`);
	}),
]);
