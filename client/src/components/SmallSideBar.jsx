import { FaTimes } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/SmallSidebar';
import { useDashboardContext } from '../pages/DashboardLayout';
import Logo from './Logo';
import NavLinks from './NavLinks';

const SmallSideBar = () => {
	const { showSideBar, toggleSideBar } = useDashboardContext();
	const sideBarClasses = `sidebar-container ${showSideBar ? 'show-sidebar' : ''}`;
	return (
		<Wrapper>
			<div className={sideBarClasses}>
				<div className="content">
					<button type="button" className="close-btn">
						<FaTimes onClick={toggleSideBar} />
					</button>
					<header>
						<Logo />
					</header>
					<NavLinks />
				</div>
			</div>
		</Wrapper>
	);
};
export default SmallSideBar;
