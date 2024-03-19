import { FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';
import { redirect, useLoaderData } from 'react-router-dom';
import myAxios from '../utils/customFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify';
import { StatItem } from '../components';

const adminLoader = async () => {
	try {
		const response = await myAxios.get('/users/admin/stats');
		return response.data;
	} catch (e) {
		console.log(e);
		toast.error('You are not authorized');
		return redirect('/dashboard');
	}
};
const Admin = () => {
	const { users, jobs } = useLoaderData();
	return (
		<Wrapper>
			<StatItem
				title={'Current Users'}
				count={users}
				color={'#e9b949'}
				bcg={'#fcefc7'}
				icon={<FaSuitcaseRolling />}
			/>
			<StatItem
				title={'Total Jobs'}
				count={jobs}
				color={'#647acb'}
				bcg={'#e0e8f9'}
				icon={<FaCalendarCheck />}
			/>
		</Wrapper>
	);
};

Admin.loader = adminLoader;
export default Admin;
