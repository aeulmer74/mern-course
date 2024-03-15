import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSideBar, Navbar, SmallSideBar } from '../components';
import { createContext, useContext, useState } from 'react';
import { checkDefaultTheme } from '../utils/checkDefaultTheme';
import myAxios from '../utils/customFetch';
import { toast } from 'react-toastify';

const dashLoader = async () => {
	try {
		const { data } = await myAxios.get('/users');
		return data;
	} catch (error) {
		return redirect('/');
	}
};

const DashboardContext = createContext();

const DashboardLayout = () => {
	const { user } = useLoaderData();
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
		await myAxios.get('/auth/logout');
		navigate('/');
		toast.success('Logged out!', { autoClose: 1000 });
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
							<Outlet context={{ user }} />
						</div>
					</div>
				</main>
			</Wrapper>
		</DashboardContext.Provider>
	);
};
// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardContext = () => useContext(DashboardContext);
DashboardLayout.loader = dashLoader;
export default DashboardLayout;
