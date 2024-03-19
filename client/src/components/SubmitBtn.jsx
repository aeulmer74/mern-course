const SubmitBtn = ({ isSubmitting, isForm }) => {
	return (
		<button
			type="submit"
			className={`btn btn-block ${isForm ? 'form-btn' : ''}`}
			disabled={isSubmitting}>
			{!isSubmitting ? 'Submit' : '...'}
		</button>
	);
};
export default SubmitBtn;
