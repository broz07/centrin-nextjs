import DefectsPage from '@centrin/components/defects/DefectsPage';
import { DefectContextProvider } from '@centrin/contexts/DefectPage/DefectContext';
import { UserContextProvider } from '@centrin/contexts/UserContext';
import { getUser, isLogged } from '@centrin/utils/server/auth';
import { redirect } from 'next/navigation';

const Defects = async () => {
	const logged = await isLogged();
	if (!logged) {
		redirect('/login');
	}

	const user = await getUser();
	if (!user) {
		redirect('/login');
	}

	return (
		<UserContextProvider>
			<DefectContextProvider>
				<DefectsPage user={user} />
			</DefectContextProvider>
		</UserContextProvider>
	)
};

export default Defects;
