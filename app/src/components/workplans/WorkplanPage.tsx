'use client';

import { IUser } from '@centrin/types/users.dto';
import PageLayout from '@centrin/components/ui/PageLayout';
import { useEffect } from 'react';
import PageHeader from '@centrin/components/ui/PageHeader';
import PageContent from '@centrin/components/ui/PageContent';
import WorkplanHeader from './WorkplanHeader';
import { useUserContext } from '@centrin/contexts/UserContext';
import WorkPlanContent from './WorkPlanContent';

interface Props {
	readonly user: IUser;
}

const WorkplanPage: React.FC<Props> = ({ user }) => {
	const { setUser } = useUserContext();

	useEffect(() => {
		setUser(user);
	}, [setUser, user]);

	return (
		<PageLayout user={user}>
			<PageHeader>
				<WorkplanHeader />
			</PageHeader>
			<PageContent>
				<WorkPlanContent />
			</PageContent>
		</PageLayout>
	);
};

export default WorkplanPage;
