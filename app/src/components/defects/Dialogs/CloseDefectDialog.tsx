'use client';

import { useDefectContext } from '@centrin/contexts/DefectPage/DefectContext';
import { useUserContext } from '@centrin/contexts/UserContext';
import {
	NotificationPosition,
	NotificationType,
	loadToast,
	updateToast,
} from '@centrin/utils/client/notify';
import { closeDefect } from '@centrin/utils/server/defects';
import { LoadingButton } from '@mui/lab';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';

interface Props {
	open: boolean;
	close: () => void;
}

const CloseDefectDialog: React.FC<Props> = ({ open, close }) => {
	const { selectedDefect, refresh } = useDefectContext();
	const { user } = useUserContext();

	const [buttonLoading, setButtonLoading] = useState<boolean>(false);
	const [closeState, setCloseState] = useState<number | undefined>(undefined);
	const [note, setNote] = useState<string | undefined>(undefined);
	const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

	useEffect(() => {
		if (!open) return;
		setCloseState(undefined);
		setNote(undefined);
		setButtonLoading(false);
		setConfirmDialogOpen(false);
	}, [open]);

	useEffect(() => {
		if (!note || note.trim().length === 0) setNote(undefined);
	}, [closeState, note]);

	const handleCloseDefect = async () => {
		if (!selectedDefect || !user || !closeState) return;

		if (selectedDefect.assigned_to && selectedDefect.assigned_to !== user.id) {
			if (confirmDialogOpen) {
				const toast = loadToast('Zavírám závadu...', NotificationPosition.BR);

				const closed = await closeDefect(
					selectedDefect.id,
					closeState,
					user.id,
					note,
				);

				if (closed) {
					updateToast(
						toast,
						'Závada uzavřena!',
						NotificationType.SUCCESS,
						NotificationPosition.BR,
						2000,
					);
				} else {
					updateToast(
						toast,
						'Nepodařilo se uzavřít závadu!',
						NotificationType.ERROR,
						NotificationPosition.BR,
						2000,
					);
				}
				setConfirmDialogOpen(false);
				setButtonLoading(false);
				refresh();
				close();
				return;
			}
			console.log('Otevřit dialog!');
			setConfirmDialogOpen(true);
			return;
		}

		setButtonLoading(true);
		if (!selectedDefect.assigned_to) {
			const toast = loadToast('Zavírám závadu...', NotificationPosition.BR);

			const closed = await closeDefect(
				selectedDefect.id,
				closeState,
				user.id,
				note,
				user.id,
			);

			if (closed) {
				updateToast(
					toast,
					'Závada uzavřena!',
					NotificationType.SUCCESS,
					NotificationPosition.BR,
					2000,
				);
			} else {
				updateToast(
					toast,
					'Nepodařilo se uzavřít závadu!',
					NotificationType.ERROR,
					NotificationPosition.BR,
					2000,
				);
			}
			setButtonLoading(false);
			refresh();
			close();
			return;
		}

		const toast = loadToast('Zavírám závadu...', NotificationPosition.BR);

		const closed = await closeDefect(
			selectedDefect.id,
			closeState,
			user.id,
			note,
		);

		if (closed) {
			updateToast(
				toast,
				'Závada uzavřena!',
				NotificationType.SUCCESS,
				NotificationPosition.BR,
				2000,
			);
		} else {
			updateToast(
				toast,
				'Nepodařilo se uzavřít závadu!',
				NotificationType.ERROR,
				NotificationPosition.BR,
				2000,
			);
		}

		setButtonLoading(false);
		refresh();
		close();
	};

	return (
		<Dialog open={open} maxWidth="sm" fullWidth>
			<Dialog open={confirmDialogOpen}>
				<DialogTitle>
					<b>Potvrzení uzavření závady</b>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{`Závada '${selectedDefect?.description}' je již přiřazena uživateli '${selectedDefect?.assigned_to_name} ${selectedDefect?.assigned_to_surname}'. Opravdu ji chceš uzavřít?`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<LoadingButton
						loading={buttonLoading}
						variant="contained"
						disabled={
							!closeState ||
							((closeState === 4 || closeState === 7) &&
								(!note || note.trim().length === 0))
						}
						onClick={handleCloseDefect}
						color="success"
						startIcon={<CheckIcon />}
					>
						Potvrdit
					</LoadingButton>
					<Button
						color="error"
						variant="contained"
						onClick={() => setConfirmDialogOpen(false)}
						startIcon={<CloseIcon />}
					>
						Zamítnout
					</Button>
				</DialogActions>
			</Dialog>
			<DialogTitle>
				<b>Uzavření závady</b>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{`Opravdu chcete uzavřít závadu '${selectedDefect?.description}'?`}
				</DialogContentText>
				<FormControl
					fullWidth
					required
					sx={{
						margin: '1rem 0',
					}}
				>
					<InputLabel id="close-state-select-label">
						Konečný stav závady
					</InputLabel>
					<Select
						labelId="close-state-select-label"
						label="Konečný stav závady"
						required
						value={closeState || ''}
						onChange={(e) => setCloseState(e.target.value as number)}
					>
						<MenuItem value={6}>Opraveno</MenuItem>
						<MenuItem value={4}>Nelze opravit</MenuItem>
						<MenuItem value={5}>Výměna za nové</MenuItem>
						<MenuItem value={7}>Zařízen servis</MenuItem>
					</Select>
				</FormControl>
				<TextField
					label="Poznámka"
					fullWidth
					multiline
					rows={4}
					value={note}
					onChange={(e) => setNote(e.target.value)}
					required={closeState === 4 || closeState === 7}
					error={
						(closeState === 4 || closeState === 7) &&
						(!note || note.trim().length === 0)
					}
					helperText={
						(closeState === 4 || closeState === 7) &&
						(!note || note.trim().length === 0)
							? 'U tohoto stavu je poznámka povinná'
							: undefined
					}
				/>
			</DialogContent>
			<DialogActions>
				<LoadingButton
					loading={buttonLoading}
					variant="contained"
					disabled={
						!closeState ||
						((closeState === 4 || closeState === 7) &&
							(!note || note.trim().length === 0))
					}
					onClick={handleCloseDefect}
					startIcon={<TaskAltIcon />}
				>
					Uzavřít závadu
				</LoadingButton>
				<Button onClick={close}>Zrušit</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CloseDefectDialog;
