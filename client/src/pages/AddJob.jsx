import { Form, redirect, useOutletContext } from 'react-router-dom';
import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { toast } from 'react-toastify';
import myAxios from '../utils/customFetch';

const addAction = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		await myAxios.post('/jobs/', data);
		toast.success(`Job added`, { autoClose: 1000 });
		return redirect('all-jobs');
	} catch (e) {
		console.log(e);
		toast.error(e?.response?.data?.msg);
		return e;
	}
};

const AddJob = () => {
	const { user } = useOutletContext();

	return (
		<Wrapper>
			<Form method="post" className="form">
				<h4 className="form-title">Add Job</h4>
				<div className="form-center">
					<FormRow type="text" name="position" labelText={'Position'} />
					<FormRow type="text" name="company" labelText={'Company'} />
					<FormRow
						type="text"
						name="jobLocation"
						labelText={'Job Location'}
						defaultValue={user.location}
					/>
					<FormRowSelect
						name="jobStatus"
						options={Object.values(JOB_STATUS)}
						labelText="Job Status"
						defaultValue={JOB_STATUS.PENDING}
					/>
					<FormRowSelect
						name="jobType"
						options={Object.values(JOB_TYPE)}
						labelText="Job Type"
						defaultValue={JOB_TYPE.FULL_TIME}
					/>
				</div>
				<SubmitBtn isForm={true} />
			</Form>
		</Wrapper>
	);
};

AddJob.action = addAction;
export default AddJob;
