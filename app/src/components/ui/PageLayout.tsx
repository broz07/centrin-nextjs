'use client';
import styles from '@centrin/styles/ui/ui.module.css';
import { IUser } from '@centrin/types/users.dto';
import { ReactNode, useEffect } from 'react';
import Sidebar from './Sidebar';
import PageContentWrapper from './PageContentWrapper';
import { useUserContext } from '@centrin/contexts/UserContext';

interface Props {
	user: IUser;
	children: ReactNode;
}

const PageLayout: React.FC<Props> = ({ user, children }) => {
	const { setUser } = useUserContext();

	useEffect(() => {
		setUser(user);
	}, [setUser, user]);

	return (
		<div className={styles.pageWrapper}>
			<Sidebar user={user} />
			<PageContentWrapper>{children}</PageContentWrapper>
		</div>
	);
};
export default PageLayout;
