import { redirect, useLoaderData } from 'react-router-dom';
import myAxios from '../utils/customFetch';
import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';
import { createContext, useContext } from 'react';

const allJobsLoader = async () => {
	try {
		const { data } = await myAxios.get('/jobs');
		return data;
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return redirect('/');
	}
};

const allJobsAction = () => {
	return null;
};
const AllJobsContext = createContext();

const AllJobs = () => {
	const { jobs } = useLoaderData();
	return (
		<AllJobsContext.Provider value={{ jobs }}>
			<SearchContainer />
			<JobsContainer />
		</AllJobsContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAllJobsContext = () => useContext(AllJobsContext);
AllJobs.loader = allJobsLoader;
AllJobs.action = allJobsAction;
export default AllJobs;
