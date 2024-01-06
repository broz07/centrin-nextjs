import WorkplanPage from '@centrin/components/workplans/WorkplanPage';
import { UserContextProvider } from '@centrin/contexts/UserContext';
import { WorkplanContextProvider } from '@centrin/contexts/WorkplanPage/WorkplanContext';
import { RoleEnum } from '@centrin/types/users.dto';
import { authUser, getUser, isLogged } from '@centrin/utils/server/auth';
// import { getAvailableDefects } from '@centrin/utils/server/workplan';
import { redirect } from 'next/navigation';

const Workplans = async () => {
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
		RoleEnum.UDRZBA,
		// RoleEnum.REDITEL,
	]);

	if (!verified) {
		redirect('/');
	}

	// const test = await getAvailableDefects();
	// console.log(test);

	return (
		// <UserContextProvider>
		<WorkplanContextProvider>
			<WorkplanPage user={user} />
		</WorkplanContextProvider>
		// </UserContextProvider>
	);
};

export default Workplans;
