'use client';

import { IUser } from '@centrin/types/users';

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
				return (
					<div>
						<h1>Plány</h1>
					</div>
				);
			case 'stats':
				return (
					<div>
						<h1>Stats</h1>
					</div>
				);
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
