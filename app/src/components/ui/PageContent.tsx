'use client';
import styles from '@centrin/styles/ui/ui.module.css';
import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

const PageContent: React.FC<Props> = ({ children }) => {
	return <main className={styles.pageContent}>{children}</main>;
};

export default PageContent;
