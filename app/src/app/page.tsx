import HomePage from '@centrin/components/home/HomePage';
import { getUser, isLogged } from '@centrin/utils/server/auth';
import { redirect } from 'next/navigation';

const Home = async () => {
	const logged = await isLogged();
	if (!logged) {
		redirect('/login');
	}

	const user = await getUser();

	if (!user) {
		redirect('/login');
	}

	return <HomePage user={user} />;
};

export default Home;
