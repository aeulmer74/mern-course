import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className="container page">
				<div className="info">
					<h1>
						job <span>tracking</span> app
					</h1>
					<p>BLahfdsajklsjieotnxmlzixrgrk lrkjalsje io asjefkl jaie fkasl</p>
					<Link to="/register" className="btn register-link">
						Register
					</Link>
					<Link to="/login" className="btn">
						Login/Demo User
					</Link>
				</div>
				<img className="img main-img" src={main} alt="hunt" />
			</div>
		</Wrapper>
	);
};

export default Landing;
