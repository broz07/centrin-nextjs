import styles from '@centrin/styles/ui/ui.module.css';
import { ReactNode } from 'react';

interface Props{
    children: ReactNode;
}

const PageContentWrapper: React.FC<Props> = ({children}) => {
    const handleSidebarClose = () => {
        const sidebar = document.querySelector(`.${styles.sidebar}`);
        sidebar?.classList.remove(`${styles.open}`);
    }

    return (
        <div className={styles.pageContentWrapper} onClick={handleSidebarClose}>
            {children}
        </div>
    )
};

export default PageContentWrapper;