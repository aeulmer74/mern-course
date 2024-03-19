import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useOutletContext } from 'react-router-dom';
import { FormRow, SubmitBtn } from '../components';
import { toast } from 'react-toastify';
import myAxios from '../utils/customFetch';

const profileAction = async ({ request }) => {
	const formData = await request.formData();
	const file = formData.get('avatar'); //image not always provided

	if (file && file.size > 500000) {
		toast.error('Too big ;)');
		return null;
	}
	try {
		await myAxios.patch('users/update-user', formData); //sends form data directly
		toast.success('Profile Updated!');
	} catch (e) {
		console.log(e);
		toast.error(e?.response?.data?.msg);
	}
	return null;
};
const Profile = () => {
	const { user } = useOutletContext();
	const { firstName, lastName, email, location } = user;

	return (
		<Wrapper>
			<Form method="post" className="form" encType="multipart/form-data">
				{' '}
				{/*needed to pass form data to server ^*/}
				<h4 className="form-title">Profile</h4>
				<div className="form-center">
					<div className="form-row">
						<label htmlFor="avatar" className="form-label">
							{' '}
							Select an image file
						</label>
						<input
							type="file"
							name="avatar"
							id="avatar"
							className="form-input"
							accept="image/*"
						/>
					</div>
					<FormRow
						type={'text'}
						name="firstName"
						labelText={'first name'}
						defaultValue={firstName}
					/>
					<FormRow
						type={'text'}
						name="lastName"
						labelText={'last Name'}
						defaultValue={lastName}
					/>
					<FormRow type={'email'} name="email" labelText={'email'} defaultValue={email} />
					<FormRow
						type={'text'}
						name="location"
						labelText={'location'}
						defaultValue={location}
					/>
					<SubmitBtn isForm={true} />
				</div>
			</Form>
		</Wrapper>
	);
};

Profile.action = profileAction;
export default Profile;
