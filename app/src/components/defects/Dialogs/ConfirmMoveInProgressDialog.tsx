'use client';

import { useDefectContext } from '@centrin/contexts/DefectPage/DefectContext';
import {
	NotificationPosition,
	NotificationType,
	loadToast,
	updateToast,
} from '@centrin/utils/client/notify';
import { moveDefectInProgress } from '@centrin/utils/server/defects';
import { LoadingButton } from '@mui/lab';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { useState } from 'react';

interface Props {
	open: boolean;
	close: () => void;
}

const ConfirmMoveInProgressDialog: React.FC<Props> = ({ open, close }) => {
	const { selectedDefect, refresh } = useDefectContext();
	const [buttonLoading, setButtonLoading] = useState<boolean>(false);

	const handleConfirm = async () => {
		if (!selectedDefect) return;
		setButtonLoading(true);

		const toast = loadToast('Přesouvám do řešení...', NotificationPosition.BR);

		const moved = await moveDefectInProgress(selectedDefect.id);

		if (moved) {
			updateToast(
				toast,
				'Úspěšně přesunuto do řešení!',
				NotificationType.SUCCESS,
				NotificationPosition.BR,
				2000,
			);
		} else {
			updateToast(
				toast,
				'Nepodařilo se přesunout do řešení!',
				NotificationType.ERROR,
				NotificationPosition.BR,
				2000,
			);
		}
		refresh();
		close();
		setButtonLoading(false);
	};

	return (
		<Dialog open={open}>
			<DialogTitle>
				<b>Potvrzení změny stavu</b>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{`Tato závada (${selectedDefect?.description}) je již přiřazena jinému uživateli (${selectedDefect?.assigned_to_name} ${selectedDefect?.assigned_to_surname}). Chcete ji přesto označit jako "V řešení"?`}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<LoadingButton
					loading={buttonLoading}
					onClick={handleConfirm}
					variant="contained"
				>
					Potvrdit
				</LoadingButton>
				<Button onClick={close}>Zrušit</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmMoveInProgressDialog;
