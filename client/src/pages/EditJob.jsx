import { Form, redirect, useLoaderData, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../../../uitls/constants';
import { toast } from 'react-toastify';
import myAxios from '../utils/customFetch';

const editLoader = async ({ params }) => {
	try {
		const { data } = await myAxios.get(`/jobs/${params.id}`);
		return data;
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return redirect('/dashboard/all-jobs');
	}
};
const editAction = () => {
	return 'null';
};

const EditJob = () => {
	const { job } = useLoaderData();
	console.log(job);
	return (
		<Wrapper>
			<h1>EditJob</h1>
		</Wrapper>
	);
};
EditJob.loader = editLoader;
EditJob.action = editAction;
export default EditJob;
