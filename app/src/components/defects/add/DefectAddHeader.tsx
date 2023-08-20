'use client';
import styles from '@centrin/styles/defects/defects.module.scss';
import { Button } from '@mui/material';

interface Props {}

const DefectAddHeader: React.FC<Props> = () => {
	return (
		<header className={styles.headerWrapper}>
			<div className={styles.headerGroup}>
				<h1>Správa závad</h1>
				<span>Založení nového záznamu</span>
			</div>
			<div>
				{/* <Button variant="contained" color="primary">
					+ Nová závada
				</Button> */}
			</div>
		</header>
	);
};

export default DefectAddHeader;
