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
				action: Register.action,
			},
			{ path: 'login', element: <Login />, action: Login.action },
			{
				path: 'dashboard',
				element: <DashboardLayout />,
				loader: DashboardLayout.loader,
				children: [
					{ index: true, element: <AddJob />, action: AddJob.action },
					{ path: 'admin', element: <Admin /> },
					{ path: 'all-jobs', element: <AllJobs />, loader: AllJobs.loader },
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
