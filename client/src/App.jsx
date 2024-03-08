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
			{ path: 'register', element: <Register /> },
			{ path: 'login', element: <Login /> },
			{
				path: 'dashboard',
				element: <DashboardLayout />,
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
	return <RouterProvider router={router} fallbackElement={<Error />} />;
};
export default App;
