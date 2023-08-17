'use client';

import PageHeader from '@centrin/components/ui/PageHeader';
import PageLayout from '@centrin/components/ui/PageLayout';
import { IUser } from '@centrin/types/users';
import { useState } from 'react';
import AdminHeader from '../src/components/admin/AdminHeader';
import PageContent from '@centrin/components/ui/PageContent';
import UserContent from './UserContent/UserContent';
import PlanContentDataProvider from './PlanContent/PlanContentDataProvider';
import StatsContentDataProvider from './StatsContent/StatsContentDataProvider';

interface Props {
	readonly user: IUser;
}

export interface IAdminContentState {
	content: string;
	description: string;
}

export const userContent: IAdminContentState = {
	content: 'users',
	description: 'Správa uživatelů',
};

export const planContent: IAdminContentState = {
	content: 'plans',
	description: 'Správa týdenních plánů',
};

export const statsContent: IAdminContentState = {
	content: 'stats',
	description: 'Uživatelské statistiky',
};

const AdminPage: React.FC<Props> = ({ user }) => {
	const [content, setContent] = useState<IAdminContentState>(userContent);

	return (
		<PageLayout user={user}>
			<PageHeader>
				<AdminHeader content={content} setContent={setContent} />
			</PageHeader>
			<PageContent>
				{content === userContent && <UserContent />}
				{content === planContent && <PlanContentDataProvider />}
				{content === statsContent && <StatsContentDataProvider />}
			</PageContent>
		</PageLayout>
	);
};

export default AdminPage;
