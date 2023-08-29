'use client';
import styles from '@centrin/styles/defects/defects.module.scss';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Props {}

const DefectsHeader: React.FC<Props> = () => {
	return (
		<header className={styles.headerWrapper}>
			<div className={styles.headerGroup}>
				<h1>Panel závad</h1>
				<span>Seznam aktivních závad</span>
			</div>
			<div>
				<Button
					variant="contained"
					color="primary"
					href="/defects/add"
					startIcon={<AddIcon />}
				>
					Nová závada
				</Button>
			</div>
		</header>
	);
};

export default DefectsHeader;
