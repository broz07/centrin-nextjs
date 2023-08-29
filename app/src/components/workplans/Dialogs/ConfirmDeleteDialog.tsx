'use client';

import { useWorkplanContext } from '@centrin/contexts/WorkplanPage/WorkplanContext';
import {
	NotificationPosition,
	NotificationType,
	loadToast,
	updateToast,
} from '@centrin/utils/client/notify';
import { removeDefectFromWorkplan } from '@centrin/utils/server/workplan';
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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Props {
	open: boolean;
	close: () => void;
}

const ConfirmDeleteDialog: React.FC<Props> = ({ open, close }) => {
	const { selectedDefect, refresh, selectedWorkplan } = useWorkplanContext();
	const [loadingButton, setLoadingButton] = useState<boolean>(false);

	const handleDelete = async () => {
		if (!selectedDefect || !selectedWorkplan) return;
		setLoadingButton(true);

		const toast = loadToast('Odebírám závadu z plánu práce...');

		const deleted = await removeDefectFromWorkplan(
			selectedDefect.id,
			selectedWorkplan,
		);

		if (deleted) {
			updateToast(
				toast,
				'Závada byla odebrána z plánu práce',
				NotificationType.SUCCESS,
				NotificationPosition.BR,
				2000,
			);
			refresh();
			close();
			setLoadingButton(false);
		} else {
			updateToast(
				toast,
				'Nepodařilo se odebrat závadu z plánu práce',
				NotificationType.ERROR,
				NotificationPosition.BR,
				2000,
			);
			refresh();
			close();
			setLoadingButton(false);
		}
	};

	return (
		<Dialog open={open} onClose={close}>
			<DialogTitle>Odebrat z týdenního plánu</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Opravdu chcete smazat závadu z týdenního plánu?
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
					Odstranit
				</LoadingButton>
				<Button onClick={close}>Zrušit</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDeleteDialog;
