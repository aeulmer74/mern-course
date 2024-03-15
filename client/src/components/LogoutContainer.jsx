import { useState } from 'react';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useDashboardContext } from '../pages/DashboardLayout';
import { FaCaretDown, FaUserCircle } from 'react-icons/fa';
import { useNavigation } from 'react-router-dom';

const LogoutContainer = () => {
	const [showLogout, setShowLogout] = useState(false);
	const { user, logoutUser } = useDashboardContext();
	const dropDownClasses = `dropdown ${showLogout ? 'show-dropdown' : ''}`;
	const nav = useNavigation();
	const isSubmitting = nav.state === 'submitting';
	return (
		<Wrapper>
			<button
				type="button"
				className="btn logout-btn"
				onClick={() => setShowLogout(!showLogout)}>
				<FaUserCircle />
				{user?.firstName}
				<FaCaretDown />
			</button>
			<div className={dropDownClasses}>
				<button
					type="button"
					className="dropdown-btn"
					onClick={logoutUser}
					disabled={isSubmitting}>
					{!isSubmitting ? 'Logout' : '...'}
				</button>
			</div>
		</Wrapper>
	);
};
export default LogoutContainer;
