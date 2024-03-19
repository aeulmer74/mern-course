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
	EditJob,
	DeleteJob,
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
					{ path: 'admin', element: <Admin />, loader: Admin.loader },
					{
						path: 'all-jobs',
						element: <AllJobs />,
						loader: AllJobs.loader,
						action: AllJobs.action,
					},
					{
						path: 'edit-job/:id',
						element: <EditJob />,
						loader: EditJob.loader,
						action: EditJob.action,
					},
					{ path: 'stats', element: <Stats /> },
					{ path: 'profile', element: <Profile /> },
					{ path: 'delete-job/:id', action: DeleteJob.action },
				],
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};
export default App;
