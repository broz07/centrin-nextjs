'use client';

import {
	UserContentContextProvider,
	useUserContentContext,
} from '@centrin/contexts/AdminPage/UserContentContext';
import UserContentHeader from './UserContentHeader';
import AddUserDialog from '../Dialogs/AddUserDialog';
import UserContentTable from './UserContentTable';
import { useEffect } from 'react';
import { getUsers } from '@centrin/utils/users';

interface Props {}

const UserContent: React.FC<Props> = () => {
	return (
		<UserContentContextProvider>
			<UserContentHeader />
			<AddUserDialog />
			<UserContentTable />
		</UserContentContextProvider>
	);
};

export default UserContent;
