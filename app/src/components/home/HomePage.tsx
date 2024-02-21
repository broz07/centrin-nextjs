'use client';

import { IUser, RoleEnum } from '@centrin/types/users.dto';
import PageLayout from '@centrin/components/ui/PageLayout';
import PageHeader from '../ui/PageHeader';
import PageContent from '../ui/PageContent';
import HomeHeader from './HomeHeader';
import DefaultContent from './contents/DefaultContent';
import AdminContent from './contents/AdminContent';

interface Props {
	readonly user: IUser;
}

const HomePage: React.FC<Props> = ({ user }) => {
	return (
		<PageLayout user={user}>
			<PageHeader>
				<HomeHeader />
			</PageHeader>
			<PageContent>
				{user &&
					[
						RoleEnum.USER,
						RoleEnum.KUCHAR,
						RoleEnum.PECOVATEL,
						RoleEnum.SESTRA,
						RoleEnum.UDRZBA,
						RoleEnum.SUPERVISOR,
					].includes(user.role.id) && <DefaultContent />}
				{user && [RoleEnum.ADMIN, RoleEnum.MANAGER].includes(user.role.id) && (
					<AdminContent />
				)}
			</PageContent>
		</PageLayout>
	);
};

export default HomePage;
