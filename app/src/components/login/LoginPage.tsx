'use client'
import styles from "@centrin/styles/login/login.module.css";
import LoginNotes from "./LoginNotes";
import LoginForm from "./LoginForm";
import PageWrapper from "../ui/PageWrapper";


const LoginPage: React.FC = () => {

    return (
        <PageWrapper>
            <div className={styles.pageWrapper}>
                <LoginNotes />
                <LoginForm />            
            </div>
        </PageWrapper>        
    );
};

export default LoginPage;