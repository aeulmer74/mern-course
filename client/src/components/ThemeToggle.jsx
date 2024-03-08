import Wrapper from '../assets/wrappers/ThemeToggle';
import { useDashboardContext } from '../pages/DashboardLayout';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
const ThemeToggle = () => {
	const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
	return (
		<Wrapper>
			<div className="btn logout-btn" onClick={toggleDarkTheme}>
				{isDarkTheme ? <BsFillSunFill className="toggle-icon" /> : <BsFillMoonFill />}
			</div>
		</Wrapper>
	);
};
export default ThemeToggle;
