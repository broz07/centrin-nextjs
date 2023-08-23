'use client';

import { useDefectContext } from '@centrin/contexts/DefectPage/DefectContext';
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
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
	NotificationPosition,
	NotificationType,
	loadToast,
	updateToast,
} from '@centrin/utils/client/notify';
import { resetDefect } from '@centrin/utils/server/defects';

interface Props {
	open: boolean;
	close: () => void;
}

const ConfirmResetDialog: React.FC<Props> = ({ open, close }) => {
	const { selectedDefect, refresh } = useDefectContext();
	const [buttonLoading, setButtonLoading] = useState<boolean>(false);

	const handleReset = async () => {
		if (!selectedDefect) return;
		setButtonLoading(true);

		const toast = loadToast('Resetuji závadu...', NotificationPosition.BR);

		const reset = await resetDefect(selectedDefect.id);

		if (reset) {
			updateToast(
				toast,
				'Závada resetována!',
				NotificationType.SUCCESS,
				NotificationPosition.BR,
				2000,
			);
		} else {
			updateToast(
				toast,
				'Nepodařilo se resetovat závadu!',
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
				<b>Potvrzení resetování závady</b>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{`Opravdu chcete resetovat závadu ${selectedDefect?.description}?`}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<LoadingButton
					loading={buttonLoading}
					variant="contained"
					color="error"
					startIcon={<RestartAltIcon />}
					onClick={handleReset}
				>
					Resetovat
				</LoadingButton>
				<Button onClick={close}>Zrušit</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmResetDialog;
