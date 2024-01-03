'use client';
import styles from '@centrin/styles/admin/admin.module.css';
import { Button, ButtonGroup } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import {
	statsContent,
	useAdminPageContext,
	userContent,
} from '@centrin/contexts/AdminPage/AdminPageContext';

interface Props {}

const AdminHeader: React.FC<Props> = () => {
	const { contentType, setContentType } = useAdminPageContext();

	return (
		<div className={styles.headerWrapper}>
			<div className={styles.headerGroup}>
				<h1>Admin Panel</h1>
				<span>{contentType.description}</span>
			</div>
			<div className={styles.buttonsWrapper}>
				<ButtonGroup>
					<Button
						startIcon={<PeopleIcon />}
						onClick={() => setContentType(userContent)}
					>
						Uživatelé
					</Button>
					<Button
						startIcon={<LeaderboardIcon />}
						onClick={() => setContentType(statsContent)}
					>
						Statistiky
					</Button>
				</ButtonGroup>
			</div>
		</div>
	);
};

export default AdminHeader;
