'use client';
import styles from '@centrin/styles/admin/admin.module.css';
import { Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useUserContentContext } from '@centrin/contexts/AdminPage/UserContentContext';

interface Props {}

const UserContentHeader: React.FC<Props> = () => {
	const { setAddUserOpen } = useUserContentContext();

	return (
		<div className={styles.userContentHeader}>
			<h3>Tabulka uživatelů</h3>
			<Button
				variant="contained"
				size="small"
				startIcon={<PersonAddIcon />}
				sx={{
					backgroundColor: '#f6f6f6',
					color: '#303030',
					'&:hover': {
						backgroundColor: '#e6e6e6',
						color: '#303030',
					},
				}}
				onClick={() => setAddUserOpen(true)}
			>
				Přidat uživatele
			</Button>
		</div>
	);
};

export default UserContentHeader;
