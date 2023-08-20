'use client';
import styles from '@centrin/styles/defects/defects.module.scss';

interface Props {}

const DefectHistoryHeader: React.FC<Props> = () => {
	return (
		<header className={styles.headerWrapper}>
			<div className={styles.headerGroup}>
				<h1>Historie závad</h1>
				<span>TODO</span>
			</div>
			<div></div>
		</header>
	);
};

export default DefectHistoryHeader;
