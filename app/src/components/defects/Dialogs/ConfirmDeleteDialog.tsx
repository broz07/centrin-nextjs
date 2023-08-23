'use client';

import { useDefectContext } from '@centrin/contexts/DefectPage/DefectContext';
import { LoadingButton } from '@mui/lab';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import {
	NotificationPosition,
	NotificationType,
	loadToast,
	updateToast,
} from '@centrin/utils/client/notify';
import { deleteDefect } from '@centrin/utils/server/defects';

interface Props {
	open: boolean;
	close: () => void;
}

const ConfirmDeleteDialog: React.FC<Props> = ({ open, close }) => {
	const [loadingButton, setLoadingButton] = useState(false);
	const { selectedDefect, refresh } = useDefectContext();

	const handleDelete = async () => {
		if (!selectedDefect) return;
		setLoadingButton(true);
		const toast = loadToast('Mazání závady', NotificationPosition.BR);

		const deleted = await deleteDefect(selectedDefect.id);

		if (deleted) {
			updateToast(
				toast,
				'Závada byla úspěšně smazána',
				NotificationType.SUCCESS,
				NotificationPosition.BR,
				2000,
			);
		} else {
			updateToast(
				toast,
				'Závada se nepodařilo smazat',
				NotificationType.ERROR,
				NotificationPosition.BR,
				2000,
			);
		}

		setLoadingButton(false);
		refresh();
		close();
	};

	return (
		<Dialog open={open} maxWidth="sm" fullWidth onClose={close}>
			<DialogTitle>
				<b>Permanentní odstranění závady</b>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{`Opravdu chcete smazat závadu" ${selectedDefect?.description}"?`}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<LoadingButton
					loading={loadingButton}
					variant="contained"
					color="error"
					startIcon={<DeleteForeverIcon />}
					onClick={handleDelete}
				>
					smazat
				</LoadingButton>
				<Button onClick={close}>Zrušit</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDeleteDialog;
