'use client';
import styles from '@centrin/styles/defects/defects.module.scss';

interface Props {}

const DefectHistoryHeader: React.FC<Props> = () => {
	return (
		<div className={styles.headerWrapper}>
			<div className={styles.headerGroup}>
				<h1>Historie závad</h1>
				<span></span>
			</div>
			<div></div>
		</div>
	);
};

export default DefectHistoryHeader;
