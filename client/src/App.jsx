import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
	HomeLayout,
	Register,
	Login,
	DashboardLayout,
	Error,
	Landing,
	AddJob,
	Stats,
	Profile,
	Admin,
	AllJobs,
} from './pages';
import { checkDefaultTheme } from './utils/checkDefaultTheme';

import { registerAction } from './pages/Register';
import { loginAction } from './pages/Login';
import { dashLoader } from './pages/DashboardLayout';

checkDefaultTheme();

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			{ index: true, element: <Landing /> },
			{
				path: 'register',
				element: <Register />,
				action: registerAction,
			},
			{ path: 'login', element: <Login />, action: loginAction },
			{
				path: 'dashboard',
				element: <DashboardLayout />,
				loader: dashLoader,
				children: [
					{ index: true, element: <AddJob /> },
					{ path: 'admin', element: <Admin /> },
					{ path: 'all-jobs', element: <AllJobs /> },
					{ path: 'stats', element: <Stats /> },
					{ path: 'profile', element: <Profile /> },
				],
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};
export default App;
