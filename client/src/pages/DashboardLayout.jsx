import { Outlet, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSideBar, Navbar, SmallSideBar } from '../components';
import { createContext, useContext, useState } from 'react';
import { checkDefaultTheme } from '../utils/checkDefaultTheme';

const DashboardContext = createContext();

const DashboardLayout = () => {
	//temp
	const user = { name: 'john' };
	const [showSideBar, setShowSideBar] = useState(false);
	const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
	const navigate = useNavigate();

	const toggleDarkTheme = () => {
		console.log(isDarkTheme ? 'Lightness' : 'Darkness');
		const newDarkTheme = !isDarkTheme;
		setIsDarkTheme(newDarkTheme);
		localStorage.setItem('darkTheme', newDarkTheme);
	};

	const toggleSideBar = () => {
		console.log('sidebar');
		setShowSideBar(!showSideBar);
	};

	const logoutUser = async () => {
		console.log('Logging out');
		navigate('/');
	};

	return (
		<DashboardContext.Provider
			value={{ user, showSideBar, isDarkTheme, toggleDarkTheme, toggleSideBar, logoutUser }}>
			<Wrapper>
				<main className="dashboard">
					<SmallSideBar />
					<BigSideBar />
					<div>
						<Navbar />
						<div className="dashboard-page">
							<Outlet />
						</div>
					</div>
				</main>
			</Wrapper>
		</DashboardContext.Provider>
	);
};
// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
