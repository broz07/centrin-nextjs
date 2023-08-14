'use client';
import styles from '@centrin/styles/login/login.module.css';
import LoginNotes from './LoginNotes';
import LoginForm from './LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <LoginNotes />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
