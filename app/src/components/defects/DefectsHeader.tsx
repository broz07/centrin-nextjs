'use client'
import styles from '@centrin/styles/defects/defects.module.scss';

interface Props{

}

const DefectsHeader: React.FC<Props> = () => {
    return (
		<header className={styles.headerWrapper}>
			<div className={styles.headerGroup}>
				<h1>Panel závad</h1>
				<span>TODO</span>
			</div>
			<div>
			</div>
		</header>
	);
}

export default DefectsHeader;