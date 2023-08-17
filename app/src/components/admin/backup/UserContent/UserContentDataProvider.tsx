import styles from '@centrin/styles/admin/admin.module.css';
import UserContentTable from './UserContentTable';
import { useEffect, useState } from 'react';
import { IUser } from '@centrin/types/users';
import { getUsers } from '@centrin/utils/server/users';

interface Props {
	refresh: boolean;
}

const UserContentDataProvider: React.FC<Props> = ({ refresh }) => {
	const [data, setData] = useState<IUser[]>([]);
	const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getUsers();
			setData(users);
		};

		fetchUsers();
	}, [refresh, refreshFlag]);

	return (
		<div className={styles.tableWrapper}>
			<UserContentTable
				refreshFlag={refreshFlag}
				setRefreshFlag={setRefreshFlag}
				data={data}
			/>
		</div>
	);
};

export default UserContentDataProvider;
