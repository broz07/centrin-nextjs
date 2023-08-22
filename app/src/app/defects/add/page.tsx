import DefectAddPage from '@centrin/components/defects/add/DefectAddPage';
import { DefectAddContextProvider } from '@centrin/contexts/DefectPage/DefectAddContext';
import { UserContextProvider } from '@centrin/contexts/UserContext';
import { getUser, isLogged } from '@centrin/utils/server/auth';
import { redirect } from 'next/navigation';

const DefectAdd = async () => {
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
			<DefectAddContextProvider>
				<DefectAddPage user={user} />
			</DefectAddContextProvider>
		</UserContextProvider>
	);
};

export default DefectAdd;
