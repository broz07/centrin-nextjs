import styles from '@centrin/styles/ui/ui.module.css';
import { ReactNode } from 'react';

interface Props{
    children: ReactNode
}

const PageWrapper: React.FC<Props> = ( {children} ) => {
    return (
        <div className={styles.pageWrapper}>
            {children}
        </div>
    );
};
export default PageWrapper;