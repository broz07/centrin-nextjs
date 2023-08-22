'use client';
import styles from '@centrin/styles/ui/ui.module.css';
import { IUser } from '@centrin/types/users.dto';
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import PageContentWrapper from './PageContentWrapper';

interface Props {
	user: IUser;
	children: ReactNode;
}

const PageLayout: React.FC<Props> = ({ user, children }) => {
	return (
		<div className={styles.pageWrapper}>
			<Sidebar user={user} />
			<PageContentWrapper>{children}</PageContentWrapper>
		</div>
	);
};
export default PageLayout;
