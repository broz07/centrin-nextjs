'use client';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { notify, NotificationPosition, NotificationType } from '@centrin/utils/notify';
import { generateToken, login } from '@centrin/utils/auth';
import { setToken } from '@centrin/utils/cookies';

import styles from '@centrin/styles/login/login.module.css';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Vyplňte uživatelské jméno'),
  password: Yup.string().required('Vyplňte heslo'),
});

interface FormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        const user = await login(values.username, values.password);
        if (!user) {
          notify('Nesprávné přihlašovací údaje! 😢', NotificationType.ERROR);
          setIsSubmitting(false);
          resetForm();
          return;
        }

        const token = await generateToken(user);
        setToken(token);

        notify('Přihlášení proběhlo úspěšně! 🤗', NotificationType.SUCCESS, NotificationPosition.TR);
        router.push('/');
      } catch (e) {
        notify('Něco se pokazilo! 😢', NotificationType.ERROR);
        resetForm();
        setIsSubmitting(false);
      }
      resetForm();
      setIsSubmitting(false);
    },
  });

  return (
    <div className={styles.loginBar}>
      <div className={styles.loginWrapper}>
        <h1>Informační systém - Centrin</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className={`${styles.formElement} ${styles.formStack}`}>
            <label htmlFor="username" className={styles.formLabel}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={styles.formInput}
            />
            {formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div> : null}
          </div>
          <div className={`${styles.formElement} ${styles.formStack}`}>
            <label htmlFor="password" className={styles.formLabel}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={styles.formInput}
            />
            {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
          </div>
          <div className={`${styles.formElement} ${styles.formSubmit}`}>
            <button type="submit" className={`${styles.button} ${styles.login}`} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
