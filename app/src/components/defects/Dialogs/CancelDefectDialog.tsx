'use client';

import { LoadingButton } from '@mui/lab';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from '@mui/material';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useEffect, useState } from 'react';
import { useDefectContext } from '@centrin/contexts/DefectPage/DefectContext';
import { useUserContext } from '@centrin/contexts/UserContext';
import {
	NotificationPosition,
	NotificationType,
	loadToast,
	updateToast,
} from '@centrin/utils/client/notify';
import { cancelDefect } from '@centrin/utils/server/defects';

interface Props {
	open: boolean;
	close: () => void;
}

const CancelDefectDialog: React.FC<Props> = ({ open, close }) => {
	const { selectedDefect, refresh } = useDefectContext();
	const { user } = useUserContext();

	const [buttonLoading, setButtonLoading] = useState<boolean>(false);
	const [reason, setReason] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (!open) return;
		setReason(undefined);
		setButtonLoading(false);
	}, [open]);

	const handleCancelDefect = async () => {
		if (!selectedDefect || !user || !reason || reason.trim().length === 0)
			return;
		setButtonLoading(true);

		const toast = loadToast('Ruším závadu...', NotificationPosition.BR);
		const canceled = await cancelDefect(selectedDefect.id, reason, user.id);

		if (canceled) {
			updateToast(
				toast,
				'Závada zrušena!',
				NotificationType.SUCCESS,
				NotificationPosition.BR,
				2000,
			);
		} else {
			updateToast(
				toast,
				'Nepodařilo se zrušit závadu!',
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
		<Dialog fullWidth maxWidth="sm" open={open}>
			<DialogTitle>
				<b>Zrušení závady</b>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{`Opravdu chcete zrušit závadu '${selectedDefect?.description}'?`}
				</DialogContentText>
				<TextField
					fullWidth
					multiline
					label="Důvod zrušení"
					variant="outlined"
					rows={4}
					sx={{
						margin: '1rem 0 0 0',
					}}
					required
					value={reason}
					onChange={(e) => setReason(e.target.value)}
					error={reason?.trim().length === 0}
					helperText={
						reason?.trim().length === 0 ? 'Důvod zrušení je povinný' : null
					}
				/>
			</DialogContent>
			<DialogActions>
				<LoadingButton
					variant="contained"
					color="error"
					loading={buttonLoading}
					startIcon={<DoDisturbIcon />}
					onClick={handleCancelDefect}
					disabled={!reason || reason.trim().length === 0}
				>
					Zrušit závadu
				</LoadingButton>
				<Button onClick={close}>Zavřít</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CancelDefectDialog;
