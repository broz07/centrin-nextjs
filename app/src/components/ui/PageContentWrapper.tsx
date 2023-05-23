import styles from '@centrin/styles/ui/ui.module.css';
import { ReactNode } from 'react';

interface Props{
    children: ReactNode;
}

const PageContentWrapper: React.FC<Props> = ({children}) => {
    return (
        <div className={styles.pageContentWrapper}>
            {children}
        </div>
    )
};

export default PageContentWrapper;