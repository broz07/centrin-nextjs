'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	NotificationPosition,
	NotificationType,
	loadToast,
	updateToast,
} from '@centrin/utils/client/notify';
import { generateToken, login } from '@centrin/utils/server/auth';
import { setToken } from '@centrin/utils/client/cookies';

import styles from '@centrin/styles/login/login.module.scss';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DOMPurify from 'dompurify';

interface IUsernameError {
	hasError: boolean;
	message?: string;
}

interface IPasswordError {
	hasError: boolean;
	message?: string;
}

const LoginForm: React.FC = () => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const usernameRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	const [usernameError, setUsernameError] = useState<IUsernameError>({
		hasError: false,
	});

	const [passwordError, setPasswordError] = useState<IPasswordError>({
		hasError: false,
	});

	const resetForm = () => {
		if (usernameRef.current && passwordRef.current) {
			usernameRef.current.value = '';
			passwordRef.current.value = '';
		}
	};

	const handleLogin = async () => {
		if (usernameRef.current && passwordRef.current) {
			const username = DOMPurify.sanitize(usernameRef.current.value);
			const password = DOMPurify.sanitize(passwordRef.current.value);

			if (
				!username ||
				username.trim() == '' ||
				!password ||
				password.trim() == ''
			) {
				if (!username || username.trim() == '') {
					setUsernameError({
						hasError: true,
						message: 'Přihlašovací jméno je povinné',
					});
				}

				if (!password || password.trim() == '') {
					setPasswordError({
						hasError: true,
						message: 'Heslo je povinné',
					});
				}
				return;
			}

			setIsSubmitting(true);

			const toast = loadToast('Přihlašování...', NotificationPosition.BR);

			try {
				const user = await login(username, password);

				if (user === null) {
					updateToast(
						toast,
						'Nemáte oprávnění pro přístup do aplikace! 😓',
						NotificationType.ERROR,
						NotificationPosition.BR,
						2000,
					);
					setIsSubmitting(false);
					resetForm();
					return;
				} else {
					const token = await generateToken(user);

					setToken(token);

					updateToast(
						toast,
						'Přihlášení proběhlo úspěšně! 🤗',
						NotificationType.SUCCESS,
						NotificationPosition.BR,
						2000,
					);

					router.refresh();
				}
			} catch (e) {
				console.log(e);
				updateToast(
					toast,
					'Něco se pokazilo! 😓',
					NotificationType.ERROR,
					NotificationPosition.BR,
					2000,
				);
				setIsSubmitting(false);
				resetForm();
				return;
			}
		}
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleLogin();
		}
	};

	return (
		<div className={styles.loginBar}>
			<div className={styles.loginWrapper}>
				<h1>Informační systém - Centrin</h1>
				<div className={`${styles.formElement} ${styles.formStack}`}>
					<TextField
						type="text"
						variant="standard"
						id="username"
						label="Přihlašovací jméno"
						fullWidth
						onKeyDown={handleKeyPress}
						onChange={() => {
							if (usernameError.hasError) setUsernameError({ hasError: false });
						}}
						error={usernameError.hasError}
						helperText={usernameError.message ? usernameError.message : null}
						inputRef={usernameRef}
					/>
				</div>
				<div className={`${styles.formElement} ${styles.formStack}`}>
					<TextField
						type="password"
						variant="standard"
						id="password"
						label="Heslo"
						fullWidth
						onKeyDown={handleKeyPress}
						onChange={() => {
							if (passwordError.hasError) setPasswordError({ hasError: false });
						}}
						error={passwordError.hasError}
						helperText={passwordError.message ? passwordError.message : null}
						inputRef={passwordRef}
					/>
				</div>
				<div className={`${styles.formElement} ${styles.formSubmit}`}>
					<LoadingButton
						id="login-button"
						fullWidth
						sx={{ marginTop: '1rem' }}
						loading={isSubmitting}
						onClick={handleLogin}
						variant="contained"
						startIcon={<VpnKeyIcon />}
					>
						Přihlásit se
					</LoadingButton>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
