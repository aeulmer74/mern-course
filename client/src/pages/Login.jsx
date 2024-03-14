import { Form, redirect, useNavigation, Link, useActionData } from 'react-router-dom';
import { FormRow, Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import myAxios from '../utils/customFetch';
import { toast } from 'react-toastify';

export const loginAction = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const errors = {
		msg: '',
	};
	if (data.password.length < 3) {
		errors.msg = 'password to short';
		return errors;
	}
	try {
		await myAxios.post('/auth/login', data);
		toast.success(`Login successful`, { autoClose: 1000 });
		return redirect('/dashboard');
	} catch (e) {
		console.log(e);
		toast.error(e?.response?.data?.msg);
		return e;
	}
};

const Login = () => {
	const nav = useNavigation;
	const isSubmitting = nav.state === 'submitting';
	const errors = useActionData();

	return (
		<Wrapper>
			<Form method="post" className="form">
				<Logo />
				<h4>Login</h4>
				{errors?.msg && <p>BAD THING HAPPENING {errors.msg}</p>}
				<FormRow
					type="email"
					name="email"
					labelText="Email"
					defaultValue="john@gmail.com"
					required={true}
				/>
				<FormRow
					type="password"
					name="password"
					labelText="Password"
					defaultValue="pass1234"
					required={true}
				/>
				<button className="btn btn-block" type="submit" disabled={isSubmitting}>
					{!isSubmitting ? 'Submit' : '...'}
				</button>
				<Link className="btn btn-block" to="/dashboard">
					Explore the app
				</Link>
				<p>
					Not a member yet?&nbsp;&nbsp;
					<Link to="/register">Register</Link>
				</p>
			</Form>
		</Wrapper>
	);
};
export default Login;
