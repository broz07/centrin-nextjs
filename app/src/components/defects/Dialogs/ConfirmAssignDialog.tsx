'use client';

import { useDefectContext } from '@centrin/contexts/DefectPage/DefectContext';
import { LoadingButton } from '@mui/lab';
import PersonIcon from '@mui/icons-material/Person';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import { useUserContext } from '@centrin/contexts/UserContext';
import { assignDefect } from '@centrin/utils/server/defects';
import {
	NotificationPosition,
	NotificationType,
	loadToast,
	updateToast,
} from '@centrin/utils/client/notify';

interface Props {
	open: boolean;
	close: () => void;
}

const ConfirmAssignDialog: React.FC<Props> = ({ open, close }) => {
	const { selectedDefect, refresh } = useDefectContext();
	const { user } = useUserContext();

	const [buttonLoading, setButtonLoading] = useState<boolean>(false);

	const handleAssign = async () => {
		if (!selectedDefect || !user) return;
		setButtonLoading(true);

		const toast = loadToast('Přiřazuji...', NotificationPosition.BR);
		const assigned = await assignDefect(selectedDefect.id, user.id);

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

		setButtonLoading(false);
		refresh();
		close();
	};

	return (
		<Dialog open={open}>
			<DialogTitle>
				<b>Potvrzení přižazení závady</b>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{`Chystáte si přiřadit závadu s popisem '${selectedDefect?.description}', která je již přiřazena uživateli '${selectedDefect?.assigned_to_name} ${selectedDefect?.assigned_to_surname}'. Opravdu chcete tuto akci provést? `}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<LoadingButton
					loading={buttonLoading}
					variant="contained"
					startIcon={<PersonIcon />}
					onClick={handleAssign}
				>
					Přiřadit mně
				</LoadingButton>
				<Button onClick={close}>Zrušit</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmAssignDialog;
