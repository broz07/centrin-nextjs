import HomePage from '@centrin/components/home/HomePage';
import { getUser, isLogged } from '@centrin/utils/server/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Informační systém - Centrin',
	description: 'Informační systém - Centrin',
};

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
