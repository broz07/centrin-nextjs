import AdminPage from '@centrin/components/admin/AdminPage';
import { AdminPageContextProvider } from '@centrin/contexts/AdminPage/AdminPageContext';
import { UserContextProvider } from '@centrin/contexts/UserContext';
import { RoleEnum } from '@centrin/types/users';
import { authUser } from '@centrin/utils/server/auth';
import { getUser, isLogged } from '@centrin/utils/server/auth';
import { redirect } from 'next/navigation';

const Admin = async () => {
	const logged = await isLogged();
	if (!logged) {
		redirect('/login');
	}

	const user = await getUser();

	if (!user) {
		redirect('/login');
	}

	const verified = await authUser([
		RoleEnum.ADMIN,
		RoleEnum.MANAGER,
		RoleEnum.REDITEL,
	]);
	if (!verified) {
		redirect('/');
	}

	return (
		<UserContextProvider>
			<AdminPageContextProvider>
				<AdminPage user={user} />
			</AdminPageContextProvider>
		</UserContextProvider>
	);
};

export default Admin;
