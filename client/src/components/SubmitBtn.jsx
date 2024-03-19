import { useNavigation } from 'react-router-dom';
const SubmitBtn = ({ isForm }) => {
	const nav = useNavigation();
	const isSubmitting = nav.state === 'submitting';
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
