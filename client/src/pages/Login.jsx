import { Link } from 'react-router-dom';
import { FormRow, Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';

const Login = () => {
	return (
		<Wrapper>
			<form className="form">
				<Logo />
				<h4>Login</h4>
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
					defaultValue="secret"
					required={true}
				/>
				<button className="btn btn-block" type="submit">
					Submit
				</button>
				<Link className="btn btn-block" to="/dashboard">
					Explore the app
				</Link>
				<p>
					Not a member yet?&nbsp;&nbsp;
					<Link to="/register">Register</Link>
				</p>
			</form>
		</Wrapper>
	);
};
export default Login;
