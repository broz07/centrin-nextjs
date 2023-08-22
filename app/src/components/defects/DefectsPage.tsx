'use client';

import { useUserContext } from '@centrin/contexts/UserContext';
import { IUser } from '@centrin/types/users.dto';
import PageLayout from '@centrin/components/ui/PageLayout';
import PageHeader from '@centrin/components/ui/PageHeader';
import PageContent from '@centrin/components/ui/PageContent';
import { useEffect } from 'react';
import DefectsHeader from './DefectsHeader';
import DefectsContent from './DefectsContent';

interface Props {
	readonly user: IUser;
}

const DefectsPage: React.FC<Props> = ({ user }) => {
	const { setUser } = useUserContext();

	useEffect(() => {
		setUser(user);
	}, [setUser, user]);

	return (
		<PageLayout user={user}>
			<PageHeader>
				<DefectsHeader />
			</PageHeader>
			<PageContent>
				<DefectsContent />
			</PageContent>
		</PageLayout>
	);
};

export default DefectsPage;
