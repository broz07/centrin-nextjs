'use client'
import styles from '@centrin/styles/ui/ui.module.css';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props{
    children: ReactNode
}

const PageWrapper: React.FC<Props> = ( {children} ) => {
    return (
        <div className={styles.pageWrapper}>
            {children}
            {/* <ToastContainer/> */}
        </div>
    );
};
export default PageWrapper;