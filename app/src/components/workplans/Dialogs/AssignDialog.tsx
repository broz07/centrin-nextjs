'use client';

import { IUser, RoleEnum } from '@centrin/types/users.dto';
import {
	NotificationPosition,
	NotificationType,
	loadToast,
	notify,
	updateToast,
} from '@centrin/utils/client/notify';
import { assignDefect, getAvailableUsers } from '@centrin/utils/server/defects';
import { LoadingButton } from '@mui/lab';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import { useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { useWorkplanContext } from '@centrin/contexts/WorkplanPage/WorkplanContext';

interface Props {
	open: boolean;
	close: () => void;
}

const AssignDialog: React.FC<Props> = ({ open, close }) => {
	const { selectedDefect, refresh } = useWorkplanContext();
	const [loadingButton, setLoadingButton] = useState(false);
	const [loadingUsers, setLoadingUsers] = useState(false);
	const [availableUsers, setAvailableUsers] = useState<IUser[]>([]);
	const [selectedUser, setSelectedUser] = useState<string>('');

	const resetDialogValues = () => {
		setSelectedUser('');
		setAvailableUsers([]);
		setLoadingButton(false);
		setLoadingUsers(false);
	};

	useEffect(() => {
		if (!open) {
			resetDialogValues();
			return;
		}

		const fetchUsers = async () => {
			setLoadingUsers(true);
			const fetchedUsers = await getAvailableUsers();

			if (!fetchedUsers) {
				notify(
					'Nepodařilo se načíst uživatele',
					NotificationType.ERROR,
					NotificationPosition.BR,
					2000,
				);
				resetDialogValues();
				close();
				return;
			}
			// console.log(fetchedUsers)
			setAvailableUsers(fetchedUsers);
			setLoadingUsers(false);
		};

		fetchUsers();
	}, [close, open]);

	const handleAssign = async () => {
		if (!selectedDefect || selectedUser === '') return;
		setLoadingButton(true);

		const toast = loadToast('Přiřazuji...', NotificationPosition.BR);
		const assigned = await assignDefect(
			selectedDefect.id,
			parseInt(selectedUser),
		);

		if (assigned) {
			updateToast(
				toast,
				'Úspěšně přiřazeno!',
				NotificationType.SUCCESS,
				NotificationPosition.BR,
				2000,
			);
		} else {
			updateToast(
				toast,
				'Nepodařilo se přiřadit závadu!',
				NotificationType.ERROR,
				NotificationPosition.BR,
				2000,
			);
		}

		refresh();
		close();
		resetDialogValues();
	};

	return (
		<Dialog open={open} onClose={close} maxWidth="sm" fullWidth>
			<DialogTitle>
				<b>Přiřadit závadu uživateli</b>
			</DialogTitle>
			<DialogContent>
				<FormControl
					fullWidth
					disabled={loadingUsers}
					sx={{ marginTop: '1rem' }}
				>
					<InputLabel id="user-select-label">Vyberte uživatele</InputLabel>
					<Select
						fullWidth
						disabled={loadingUsers}
						placeholder={
							loadingUsers ? 'Načítám uživatele...' : 'Vyberte uživatele'
						}
						label="Vyberte uživatele"
						value={selectedUser}
						onChange={(e) => setSelectedUser(e.target.value as string)}
					>
						{availableUsers.map((user) => {
							const disabled =
								selectedDefect?.type_id !== 2 &&
								user.role.id === RoleEnum.UKLIZEC;
							return (
								<MenuItem key={user.id} value={user.id} disabled={disabled}>
									{`${user.displayName}`}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<LoadingButton
					loading={loadingButton}
					variant="contained"
					startIcon={<SaveIcon />}
					onClick={handleAssign}
					disabled={selectedUser === '' || loadingUsers}
				>
					Uložit
				</LoadingButton>
				<Button onClick={close}>Zrušit</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AssignDialog;
