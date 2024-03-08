import Logo from '../components/Logo';
import FormRow from '../components/FormRow';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';

const Register = () => {
	return (
		<Wrapper>
			<form className="form">
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
					defaultValue="secret"
					labelText="First Name"
					required={true}
				/>
				<button className="btn btn-block" type="submit">
					Submit
				</button>
				<p>
					Already a member?&nbsp;&nbsp;
					<Link to="/login">Login</Link>
				</p>
			</form>
		</Wrapper>
	);
};
export default Register;
