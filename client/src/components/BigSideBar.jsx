import Wrapper from '../assets/wrappers/BigSidebar';
import { useDashboardContext } from '../pages/DashboardLayout';
import Logo from './Logo';
import NavLinks from './NavLinks';

const BigSideBar = () => {
	const { showSideBar } = useDashboardContext();
	const sideBarClasses = `sidebar-container ${!showSideBar ? 'show-sidebar' : ''}`;
	return (
		<Wrapper>
			<div className={sideBarClasses}>
				<div className="content">
					<header>
						<Logo />
					</header>
					<NavLinks isBigSidebar />
				</div>
			</div>
		</Wrapper>
	);
};
export default BigSideBar;
