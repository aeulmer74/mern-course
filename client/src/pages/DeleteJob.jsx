import { toast } from 'react-toastify';
import myAxios from '../utils/customFetch';
import { redirect } from 'react-router-dom';

const deleteAction = async ({ params }) => {
	try {
		await myAxios.delete(`/jobs/${params.id}`);
		toast.success('Job Deleted!');
	} catch (e) {
		console.log(e);
		toast.error(e?.response?.data?.msg);
	}
	return redirect('/dashboard/all-jobs');
};

const DeleteJob = () => {
	return <h1>DeleteJob</h1>;
};

DeleteJob.action = deleteAction;
export default DeleteJob;
