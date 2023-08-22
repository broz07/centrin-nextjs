'use client';

import { useDefectContext } from '@centrin/contexts/DefectPage/DefectContext';
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
import { SeverityEnum } from '@centrin/types/defects.dto';
import { changeSeverity } from '@centrin/utils/server/defects';
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

const SeverityChangeDialog: React.FC<Props> = ({ open, close }) => {
	const { selectedDefect, refresh } = useDefectContext();
	const [buttonLoading, setButtonLoading] = useState<boolean>(false);
	const [severity, setSeverity] = useState<SeverityEnum>(
		SeverityEnum.UNCLASSIFIED,
	);

	useEffect(() => {
		if (!open) return;
		setSeverity(selectedDefect?.severity_id || SeverityEnum.UNCLASSIFIED);
	}, [selectedDefect, open]);

	const handleSeverityChange = async () => {
		if (!selectedDefect) return;
		setButtonLoading(true);

		const toast = loadToast('Měním závažnost...', NotificationPosition.BR);
		const changed = await changeSeverity(selectedDefect.id, severity);

		if (changed) {
			updateToast(
				toast,
				'Závažnost změněna!',
				NotificationType.SUCCESS,
				NotificationPosition.BR,
				2000,
			);
		} else {
			updateToast(
				toast,
				'Nepodařilo se změnit závažnost!',
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
		<Dialog
			open={open}
			fullWidth
			maxWidth="sm"
			// open
		>
			<DialogTitle>Změna závažnosti</DialogTitle>
			<DialogContent>
				<FormControl
					fullWidth
					sx={{
						margin: '1rem 0 0 0',
					}}
				>
					<InputLabel id="severity-label">Závažnost</InputLabel>
					<Select
						labelId="severity-label"
						label="Závažnost"
						id="severity"
						value={severity}
						onChange={(e) => setSeverity(e.target.value as SeverityEnum)}
					>
						<MenuItem value={SeverityEnum.UNCLASSIFIED}>
							Neklasifikováno
						</MenuItem>
						<MenuItem value={SeverityEnum.LOW}>Nízká priorita</MenuItem>
						<MenuItem value={SeverityEnum.MEDIUM}>Střední priorita</MenuItem>
						<MenuItem value={SeverityEnum.HIGH}>Vysoká priorita</MenuItem>
						<MenuItem value={SeverityEnum.CRITICAL}>Kritická priorita</MenuItem>
					</Select>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<LoadingButton
					variant="contained"
					loading={buttonLoading}
					startIcon={<SaveIcon />}
					onClick={handleSeverityChange}
				>
					Uložit
				</LoadingButton>
				<Button onClick={close}>Zrušit</Button>
			</DialogActions>
		</Dialog>
	);
};

export default SeverityChangeDialog;
