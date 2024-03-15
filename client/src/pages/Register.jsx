import Logo from '../components/Logo';
import FormRow from '../components/FormRow';
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import myAxios from '../utils/customFetch';
import { toast } from 'react-toastify';

const registerAction = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		await myAxios.post('/auth/register', data);
		toast.success(`Welcome ${data.firstName}`);
		return redirect('/login');
	} catch (e) {
		console.log(e);
		toast.error(e?.response?.data?.msg);
		return e;
	}
};

const Register = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	return (
		<Wrapper>
			<Form method="post" className="form">
				<Logo />
				<h4>Register</h4>
				<FormRow
					type="text"
					name="firstName"
					defaultValue="John"
					labelText="First Name"
					required={true}
				/>
				<FormRow
					type="text"
					name="lastName"
					defaultValue="Jingleheimerschmidt"
					labelText="Last Name"
					required={true}
				/>
				<FormRow
					type="text"
					name="location"
					defaultValue="earth"
					labelText="Location"
					required={true}
				/>
				<FormRow
					type="email"
					name="email"
					defaultValue="john@gmail.com"
					labelText="Email"
					required={true}
				/>
				<FormRow
					type="password"
					name="password"
					defaultValue="pass1234"
					labelText="password"
					required={true}
				/>
				<button className="btn btn-block" type="submit" disabled={isSubmitting}>
					{!isSubmitting ? 'Submit' : '...'}
				</button>
				<p>
					Already a member?&nbsp;&nbsp;
					<Link to="/login">Login</Link>
				</p>
			</Form>
		</Wrapper>
	);
};

Register.action = registerAction;
export default Register;
