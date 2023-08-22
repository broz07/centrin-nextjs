'use client';

import {
	IUser,
	IUserUpdate,
	RoleEnum,
	roleSelectValues,
} from '@centrin/types/users.dto';
import {
	NotificationPosition,
	NotificationType,
	loadToast,
	notify,
	updateToast,
} from '@centrin/utils/client/notify';
import {
	findUser,
	getUnavailableUsernames,
	resetUserPassword,
	updateUser,
} from '@centrin/utils/server/users';
import { LoadingButton } from '@mui/lab';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	MenuItem,
	Skeleton,
	TextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useUserContentContext } from '@centrin/contexts/AdminPage/UserContentContext';

interface Props {
	open: boolean;
	close: () => void;
	userId?: number;
}

const EditUserDialog: React.FC<Props> = ({ open, close, userId }) => {
	const { refresh } = useUserContentContext();
	const [buttonLoading, setButtonLoading] = useState<boolean>(false);
	const [user, setUser] = useState<IUser | undefined>(undefined);
	const [unavaliableUsernames, setUnavaliableUsernames] = useState<string[]>(
		[],
	);
	const [username, setUsername] = useState<string>('');
	const [selectValue, setSelectValue] = useState<RoleEnum>(RoleEnum.USER);

	const nameRef = useRef<HTMLInputElement>(null);
	const surnameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordAgainRef = useRef<HTMLInputElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);
	const roleRef = useRef<HTMLSelectElement>(null);

	const closeDialog = () => {
		setUser(undefined);
		setSelectValue(RoleEnum.USER);
		setUsername('');
		setButtonLoading(false);
		close();
	};

	useEffect(() => {
		if (!open) return;

		if (!userId) return;

		const fetchUser = async () => {
			const fetchedUser = await findUser(userId);

			if (!fetchedUser) {
				notify(
					'Nepodařilo se načíst uživatele. 🤕',
					NotificationType.ERROR,
					NotificationPosition.BR,
					2000,
				);
				return;
			}

			setUser(fetchedUser);
			setUsername(fetchedUser.username);
			setSelectValue(fetchedUser.role.id);

			const usernames = await getUnavailableUsernames();
			setUnavaliableUsernames(usernames);
		};
		fetchUser();
	}, [userId, open]);

	const handleEdit = async () => {
		setButtonLoading(true);
		if (
			!nameRef.current ||
			!surnameRef.current ||
			!emailRef.current ||
			!passwordRef.current ||
			!passwordAgainRef.current ||
			!usernameRef.current ||
			!roleRef.current ||
			!userId
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

		if (name.trim() === '' || surname.trim() === '' || username.trim() === '') {
			notify(
				'Vyplňte všechna povinná pole! 🫡',
				NotificationType.ERROR,
				NotificationPosition.BR,
				2000,
			);
			setButtonLoading(false);
			return;
		}

		if (
			unavaliableUsernames.includes(username) &&
			username !== user?.username
		) {
			notify(
				'Uživatelské jméno je již zabrané!',
				NotificationType.ERROR,
				NotificationPosition.BR,
				2000,
			);
			setButtonLoading(false);
			return;
		}

		const toast = loadToast('Upravování uživatele...');

		const userToUpdate: IUserUpdate = {
			name,
			surname,
			email,
			username,
			role: selectValue,
		};

		const updated = await updateUser(userId, userToUpdate);

		if (!updated) {
			updateToast(
				toast,
				'Nepodařilo se upravit uživatele. 🤕',
				NotificationType.ERROR,
				NotificationPosition.BR,
				2000,
			);
			return;
		}

		if (password.trim() !== '' || passwordAgain.trim() !== '') {
			if (password.trim() === '' || passwordAgain.trim() === '') {
				updateToast(
					toast,
					'Vyplňte heslo! 🫡',
					NotificationType.ERROR,
					NotificationPosition.BR,
					2000,
				);
				return;
			}

			if (password.trim() !== passwordAgain.trim()) {
				updateToast(
					toast,
					'Hesla se neshodují! 🤕',
					NotificationType.ERROR,
					NotificationPosition.BR,
					2000,
				);
				return;
			}

			const passwordUpdated = await resetUserPassword(userId, password.trim());

			if (!passwordUpdated) {
				updateToast(
					toast,
					'Nepodařilo se upravit heslo. 🤕',
					NotificationType.ERROR,
					NotificationPosition.BR,
					2000,
				);
				return;
			}
		}

		updateToast(
			toast,
			'Uživatel byl upraven. 🥳',
			NotificationType.SUCCESS,
			NotificationPosition.BR,
			2000,
		);
		refresh();
		closeDialog();
	};

	return (
		<Dialog open={open} maxWidth="sm" fullWidth>
			<DialogTitle>
				<b>{`Úprava uživatele ${user?.displayName}`}</b>
			</DialogTitle>
			<DialogContent>
				{user ? (
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
								value={user.name}
							/>
							<TextField
								sx={{ marginTop: '0.5rem' }}
								type="text"
								fullWidth
								required
								label="Příjmení"
								inputRef={surnameRef}
								value={user.surname}
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
								error={
									unavaliableUsernames?.includes(username) &&
									username !== user.username
								}
								helperText={
									unavaliableUsernames?.includes(username) &&
									username !== user.username
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
								value={user.email}
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
								label="Nové heslo"
								inputRef={passwordRef}
							/>
							<TextField
								sx={{ marginTop: '0.5rem' }}
								type="password"
								fullWidth
								label="Nové heslo znovu"
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
				) : (
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
								justifyContent: 'center',
							}}
						>
							<Skeleton variant="rounded">
								<TextField />
							</Skeleton>

							<Skeleton variant="rounded">
								<TextField />
							</Skeleton>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								gap: '0.5rem',
								justifyContent: 'center',
							}}
						>
							<Skeleton variant="rounded">
								<TextField />
							</Skeleton>

							<Skeleton variant="rounded">
								<TextField />
							</Skeleton>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								gap: '0.5rem',
								justifyContent: 'center',
							}}
						>
							<Skeleton variant="rounded">
								<TextField />
							</Skeleton>

							<Skeleton variant="rounded">
								<TextField />
							</Skeleton>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								gap: '0.5rem',
								justifyContent: 'center',
							}}
						>
							<Skeleton variant="rounded">
								<TextField />
							</Skeleton>
						</Box>
					</Box>
				)}
			</DialogContent>
			<DialogActions>
				<LoadingButton
					loading={buttonLoading}
					variant="contained"
					startIcon={<ModeEditIcon />}
					onClick={handleEdit}
					disabled={!user}
				>
					Odebrat
				</LoadingButton>
				<Button onClick={closeDialog}>Zrušit</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditUserDialog;
