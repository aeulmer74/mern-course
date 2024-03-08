import { useState } from 'react';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useDashboardContext } from '../pages/DashboardLayout';
import { FaCaretDown, FaUserCircle } from 'react-icons/fa';

const LogoutContainer = () => {
	const [showLogout, setShowLogout] = useState(false);
	const { user, logoutUser } = useDashboardContext();
	const dropDownClasses = `dropdown ${showLogout ? 'show-dropdown' : ''}`;
	return (
		<Wrapper>
			<button
				type="button"
				className="btn logout-btn"
				onClick={() => setShowLogout(!showLogout)}>
				<FaUserCircle />
				{user?.name}
				<FaCaretDown />
			</button>
			<div className={dropDownClasses}>
				<button type="button" className="dropdown-btn" onClick={logoutUser}>
					Logout
				</button>
			</div>
		</Wrapper>
	);
};
export default LogoutContainer;
