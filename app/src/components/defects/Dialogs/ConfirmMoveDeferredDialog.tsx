'use client';

import { useDefectContext } from '@centrin/contexts/DefectPage/DefectContext';
import {
	NotificationPosition,
	NotificationType,
	loadToast,
	updateToast,
} from '@centrin/utils/client/notify';
import { deferDefect } from '@centrin/utils/server/defects';
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

const ConfirmMoveDeferredDialog: React.FC<Props> = ({ open, close }) => {
	const { selectedDefect, refresh } = useDefectContext();
	const [buttonLoading, setButtonLoading] = useState<boolean>(false);

	const handleConfirm = async () => {
		if (!selectedDefect) return;
		setButtonLoading(true);

		const toast = loadToast('Odkládám závadu...', NotificationPosition.BR);

		const moved = await deferDefect(selectedDefect.id);

		if (moved) {
			updateToast(
				toast,
				'Úspěšně odloženo!',
				NotificationType.SUCCESS,
				NotificationPosition.BR,
				2000,
			);
		} else {
			updateToast(
				toast,
				'Nepodařilo se odložit!',
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
					{`Tato závada (${selectedDefect?.description}) je již přiřazena jinému uživateli (${selectedDefect?.assigned_to_name} ${selectedDefect?.assigned_to_surname}). Chcete ji přesto označit jako "Odloženo"?`}
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

export default ConfirmMoveDeferredDialog;
