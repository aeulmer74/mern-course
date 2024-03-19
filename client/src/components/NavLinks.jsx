import { useDashboardContext } from '../pages/DashboardLayout';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';

const NavLinks = ({ isBigSidebar }) => {
	const { toggleSideBar, user } = useDashboardContext();
	const isAdmin = user.role === 'admin';
	return (
		<div className="nav-links">
			{links.map((link) => {
				const { text, path, icon } = link;
				if (!isAdmin && text === 'admin') return;
				return (
					<NavLink
						key={text}
						to={path}
						className="nav-link"
						onClick={isBigSidebar ? null : toggleSideBar}
						end>
						<span className="icon">{icon}</span>
						{text}
					</NavLink>
				);
			})}
		</div>
	);
};
export default NavLinks;
