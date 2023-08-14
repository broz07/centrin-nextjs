'use client';

import styles from '@centrin/styles/ui/ui.module.css';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const PageHeader: React.FC<Props> = ({ children }) => {
  return <header className={styles.pageHeader}>{children}</header>;
};

export default PageHeader;
