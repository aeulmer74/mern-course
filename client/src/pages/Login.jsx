import { Form, redirect, Link, useActionData } from 'react-router-dom';
import { FormRow, Logo, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import myAxios from '../utils/customFetch';
import { toast } from 'react-toastify';

const loginAction = async ({ request }) => {
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
				<SubmitBtn isForm={false} />
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
Login.action = loginAction;
export default Login;
