'use client';

import { useUserContentContext } from '@centrin/contexts/AdminPage/UserContentContext';
import { IUserAdd, RoleEnum, roleSelectValues } from '@centrin/types/users.dto';
import { addUser, getUnavailableUsernames } from '@centrin/utils/server/users';
import { LoadingButton } from '@mui/lab';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	MenuItem,
	TextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import {
	NotificationPosition,
	NotificationType,
	loadToast,
	notify,
	updateToast,
} from '@centrin/utils/client/notify';

interface Props {}

const AddUserDialog: React.FC<Props> = () => {
	const { addUserOpen, setAddUserOpen, refresh } = useUserContentContext();
	const [unavaliableUsernames, setUnavaliableUsernames] = useState<string[]>(
		[],
	);
	const [buttonLoading, setButtonLoading] = useState<boolean>(false);

	const [username, setUsername] = useState<string>('');
	const [selectValue, setSelectValue] = useState<RoleEnum>(RoleEnum.USER);

	const nameRef = useRef<HTMLInputElement>(null);
	const surnameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordAgainRef = useRef<HTMLInputElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);
	const roleRef = useRef<HTMLSelectElement>(null);

	useEffect(() => {
		const fetchUnavaliableUsernames = async () => {
			const usernames = await getUnavailableUsernames();
			setUnavaliableUsernames(usernames);
		};

		fetchUnavaliableUsernames();
	}, []);

	const handleClose = () => {
		setAddUserOpen(false);
		setSelectValue(RoleEnum.USER);
		setUsername('');
		setButtonLoading(false);
	};

	const handleAddUser = async () => {
		setButtonLoading(true);
		if (
			!nameRef.current ||
			!surnameRef.current ||
			!emailRef.current ||
			!passwordRef.current ||
			!passwordAgainRef.current ||
			!usernameRef.current ||
			!roleRef.current
		) {
			notify(
				'Něco se pokazilo',
				NotificationType.ERROR,
				NotificationPosition.BR,
				2000,
			);
			setButtonLoading(false);
			return;
		}

		const name = nameRef.current.value;
		const surname = surnameRef.current.value;
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const passwordAgain = passwordAgainRef.current.value;
		const username = usernameRef.current.value;

		if (
			name.trim() === '' ||
			surname.trim() === '' ||
			password.trim() === '' ||
			passwordAgain.trim() === '' ||
			username.trim() === ''
		) {
			notify(
				'Vyplňte všechna povinná pole! 🫡',
				NotificationType.ERROR,
				NotificationPosition.BR,
				2000,
			);
			setButtonLoading(false);
			return;
		}

		if (password !== passwordAgain) {
			notify(
				'Hesla se neshodují!',
				NotificationType.ERROR,
				NotificationPosition.BR,
				2000,
			);
			setButtonLoading(false);
			return;
		}

		if (unavaliableUsernames.includes(username)) {
			notify(
				'Uživatelské jméno je již zabrané!',
				NotificationType.ERROR,
				NotificationPosition.BR,
				2000,
			);
			setButtonLoading(false);
			return;
		}

		const toast = loadToast('Přidávání uživatele...');

		const user: IUserAdd = {
			name,
			surname,
			email,
			username,
			password: password.trim(),
		};

		const added = await addUser(user, selectValue);

		if (added) {
			updateToast(
				toast,
				'Uživatel byl úspěšně přidán!',
				NotificationType.SUCCESS,
				NotificationPosition.BR,
				2000,
			);
			setSelectValue(RoleEnum.USER);
			setUsername('');
			setButtonLoading(false);
			refresh();
			setAddUserOpen(false);
			return;
		}

		updateToast(
			toast,
			'Něco se pokazilo!',
			NotificationType.ERROR,
			NotificationPosition.BR,
			2000,
		);
		setButtonLoading(false);
	};

	return (
		<Dialog open={addUserOpen} maxWidth="sm" fullWidth>
			<DialogTitle>
				<b>Přidat uživatele</b>
			</DialogTitle>
			<DialogContent>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '0.5rem',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: '0.5rem',
						}}
					>
						<TextField
							sx={{ marginTop: '0.5rem' }}
							type="text"
							fullWidth
							required
							label="Jméno"
							inputRef={nameRef}
						/>
						<TextField
							sx={{ marginTop: '0.5rem' }}
							type="text"
							fullWidth
							required
							label="Příjmení"
							inputRef={surnameRef}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: '0.5rem',
						}}
					>
						<TextField
							sx={{ marginTop: '0.5rem' }}
							type="text"
							fullWidth
							required
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							error={unavaliableUsernames?.includes(username)}
							helperText={
								unavaliableUsernames?.includes(username)
									? 'Toto uživatelské jméno je již zabrané'
									: ''
							}
							label="Přihlašovací jméno"
							inputRef={usernameRef}
						/>
						<TextField
							sx={{ marginTop: '0.5rem' }}
							type="email"
							fullWidth
							label="E-mail"
							inputRef={emailRef}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: '0.5rem',
						}}
					>
						<TextField
							sx={{ marginTop: '0.5rem' }}
							type="password"
							fullWidth
							required
							label="Heslo"
							inputRef={passwordRef}
						/>
						<TextField
							sx={{ marginTop: '0.5rem' }}
							type="password"
							fullWidth
							required
							label="Heslo znovu"
							inputRef={passwordAgainRef}
						/>
					</Box>
					<Box
					// sx={{
					//     display: "flex",
					//     flexDirection: "row",
					//     gap: "0.5rem",
					// }}
					>
						<TextField
							label="Role"
							select
							fullWidth
							value={selectValue}
							helperText="Vyberte roli uživatele"
							required
							inputRef={roleRef}
							sx={{ marginTop: '0.5rem' }}
						>
							{roleSelectValues.map((option) => (
								<MenuItem
									key={option.value}
									value={option.value}
									onClick={() => setSelectValue(option.value)}
								>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Box>
				</Box>
			</DialogContent>
			<DialogActions>
				<LoadingButton
					loading={buttonLoading}
					variant="contained"
					startIcon={<PersonAddIcon />}
					onClick={handleAddUser}
				>
					Přidat uživatele
				</LoadingButton>
				<Button onClick={handleClose}>Zrušit</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddUserDialog;
