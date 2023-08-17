'use client';

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
import {
	NotificationPosition,
	NotificationType,
	loadToast,
	updateToast,
} from '@centrin/utils/client/notify';
import { deleteUser, deleteUsers } from '@centrin/utils/server/users';
import { useUserContentContext } from '@centrin/contexts/AdminPage/UserContentContext';

interface Props {
	userIds?: number[];
	open: boolean;
	close: () => void;
	resetSelected?: () => void;
}

const RemoveUserDialog: React.FC<Props> = ({
	open,
	close,
	userIds,
	resetSelected,
}) => {
	const { refresh } = useUserContentContext();
	const [buttonLoading, setButtonLoading] = useState<boolean>(false);

	const handleRemove = async () => {
		setButtonLoading(true);
		const toast = loadToast('Odebírání uživatele...');

		if (!userIds) {
			updateToast(
				toast,
				'Nepodařilo se odebrat uživatele.',
				NotificationType.ERROR,
				NotificationPosition.BR,
				2000,
			);
			setButtonLoading(false);
			refresh();
			close();
			return;
		}

		const deleted = await deleteUsers(userIds);

		if (deleted) {
			updateToast(
				toast,
				'Záznamy byly úspěšně odebrány! 👍🏻',
				NotificationType.SUCCESS,
				NotificationPosition.BR,
				2000,
			);
		} else {
			updateToast(
				toast,
				'Nepodařilo se odebrat uživatele. 😓',
				NotificationType.ERROR,
				NotificationPosition.BR,
				2000,
			);
		}

		setButtonLoading(false);
		if (resetSelected) resetSelected();
		refresh();
		close();
	};

	return (
		<Dialog open={open} maxWidth="sm" fullWidth>
			<DialogTitle>
				<b>Odebrat uživatele</b>
			</DialogTitle>
			<DialogContent>
				{userIds && userIds.length == 1 && (
					<DialogContentText>
						{`Opravdu chcete odebrat uživatele s ID: ${userIds[0]}?`}
					</DialogContentText>
				)}
				{userIds && userIds.length > 1 && (
					<DialogContentText>
						{`Opravdu chcete odebrat označené (${userIds.length}) uživatele?`}
					</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				<LoadingButton
					loading={buttonLoading}
					variant="contained"
					startIcon={<DeleteForeverIcon />}
					onClick={handleRemove}
				>
					Odebrat
				</LoadingButton>
				<Button onClick={close}>Zrušit</Button>
			</DialogActions>
		</Dialog>
	);
};

export default RemoveUserDialog;
