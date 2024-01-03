import DefectHistoryPage from '@centrin/components/defects/history/DefectHistoryPage';
import { DefectContextProvider } from '@centrin/contexts/DefectPage/DefectContext';
import { UserContextProvider } from '@centrin/contexts/UserContext';
import { getUser, isLogged } from '@centrin/utils/server/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Historie závad - Centrin',
	description: 'Stránka s historií závad v systému DOD Centrin',
};

const DefectHistory = async () => {
	const logged = await isLogged();
	if (!logged) {
		redirect('/login');
	}

	const user = await getUser();
	if (!user) {
		redirect('/login');
	}

	return (
		// <UserContextProvider>
		<DefectContextProvider>
			<DefectHistoryPage user={user} />
		</DefectContextProvider>
		// </UserContextProvider>
	);
};

export default DefectHistory;
