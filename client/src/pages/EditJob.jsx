import { Form, redirect, useLoaderData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../../../uitls/constants';
import { toast } from 'react-toastify';
import myAxios from '../utils/customFetch';
import SubmitBtn from '../components/SubmitBtn';

const editLoader = async ({ params }) => {
	try {
		const { data } = await myAxios.get(`/jobs/${params.id}`);
		return data;
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return redirect('/dashboard/all-jobs');
	}
};
const editAction = async ({ request, params }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		await myAxios.patch(`/jobs/${params.id}`, data);
		toast.success('Job Edited Successfully');
		return redirect('/dashboard/all-jobs');
	} catch (e) {
		console.log(e);
		toast.error(e?.response?.data?.msg);
		return e;
	}
};

const EditJob = () => {
	const { job } = useLoaderData();

	return (
		<Wrapper>
			<Form method="post" className="form">
				<h4 className="form-title">Edit Job</h4>
				<div className="form-center">
					<FormRow
						type="text"
						name="position"
						labelText={'Position'}
						defaultValue={job.position}
					/>
					<FormRow
						type="text"
						name="company"
						labelText={'Company'}
						defaultValue={job.company}
					/>
					<FormRow
						type="text"
						name="jobLocation"
						labelText={'Job Location'}
						defaultValue={job.jobLocation}
					/>
					<FormRowSelect
						name="jobStatus"
						options={Object.values(JOB_STATUS)}
						labelText="Job Status"
						defaultValue={job.jobStatus}
					/>
					<FormRowSelect
						name="jobType"
						options={Object.values(JOB_TYPE)}
						labelText="Job Type"
						defaultValue={job.jobType}
					/>
				</div>
				<SubmitBtn isForm={true} />
			</Form>
		</Wrapper>
	);
};
EditJob.loader = editLoader;
EditJob.action = editAction;
export default EditJob;
