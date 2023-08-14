'use client';

import { IUser } from '@centrin/types/user';
import PlanContentDataProvider from './backup/PlanContent/PlanContentDataProvider';
import StatsContentDataProvider from './backup/StatsContent/StatsContentDataProvider';

import { useUserContext } from '@centrin/contexts/UserContext';
import PageLayout from '@centrin/components/ui/PageLayout';
import { useEffect } from 'react';
import PageHeader from '@centrin/components/ui/PageHeader';
import PageContent from '@centrin/components/ui/PageContent';
import AdminHeader from './AdminHeader';
import { useAdminPageContext } from '@centrin/contexts/AdminPage/AdminPageContext';
import UserContent from '@centrin/components/admin/UserContent/UserContent';

interface Props {
	readonly user: IUser;
}

const AdminPage: React.FC<Props> = ({ user }) => {
	const { setUser } = useUserContext();
	const { contentType } = useAdminPageContext();

	useEffect(() => {
		setUser(user);
	}, [setUser, user]);

	const renderContent = () => {
		switch (contentType.content) {
			case 'users':
				return <UserContent />;
			case 'plans':
				return <PlanContentDataProvider />;
			case 'stats':
				return <StatsContentDataProvider />;
			default:
				return <UserContent />;
		}
	};

	return (
		<PageLayout user={user}>
			<PageHeader>
				<AdminHeader />
			</PageHeader>
			<PageContent>{renderContent()}</PageContent>
		</PageLayout>
	);
};

export default AdminPage;
