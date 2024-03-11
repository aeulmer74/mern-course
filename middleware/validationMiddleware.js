import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../uitls/constants.js';

const withValidationErrors = (validatedValues) => {
	return [
		validatedValues,
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const errorMessages = errors.array().map((err) => err.msg);
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
