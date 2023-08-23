'use client';

import { useDefectContext } from '@centrin/contexts/DefectPage/DefectContext';
import { useUserContext } from '@centrin/contexts/UserContext';
import { LoadingButton } from '@mui/lab';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { NotificationPosition, NotificationType, loadToast, updateToast } from '@centrin/utils/client/notify';
import { changeDefectDesc } from '@centrin/utils/server/defects';

interface Props {
	open: boolean;
	close: () => void;
}

const EditDescDialog: React.FC<Props> = ({ open, close }) => {
	const { selectedDefect, refresh } = useDefectContext();
	const [buttonLoading, setButtonLoading] = useState<boolean>(false);

	const [desc, setDesc] = useState<string | undefined>(undefined);
	const [detailDesc, setDetailDesc] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (selectedDefect) {
			setDesc(selectedDefect.description);
			setDetailDesc(selectedDefect.info);
		}
	}, [selectedDefect]);

    const handleEdit = async () => {
        if (!selectedDefect || !desc) return;
        setButtonLoading(true);

        const toast = loadToast('Ukládání změn...', NotificationPosition.BR);

        const edited = await changeDefectDesc(selectedDefect.id, desc, detailDesc);

        if (edited) {
            updateToast(toast, 'Změny byly úspěšně uloženy!',NotificationType.SUCCESS, NotificationPosition.BR, 2000);
        } else {
            updateToast(toast, 'Něco se nepovedlo! 😓',NotificationType.ERROR, NotificationPosition.BR, 2000);
        }
        
        setButtonLoading(false);
        refresh();
        close();
    }

	return (
		<Dialog maxWidth="sm" fullWidth open={open}>
			<DialogTitle>
				<b>Oprava popisu závady</b>
			</DialogTitle>
			<DialogContent>
				<TextField
					fullWidth
					value={desc}
					required
					label="Stručný popis (max. 40 znaků)"
					onChange={(e) => {
						if (e.target.value.length <= 40) {
							setDesc(e.target.value);
						}
					}}
					error={desc ? (desc.trim() === '' || desc.length > 40) : true}
					color={desc ? (desc.length == 40 ? 'warning' : 'success') : 'error'}
					helperText={
						desc && desc.trim() !== ''
							? desc.length == 40
								? 'Dosáhli jste maximální délky! (40/40)'
								: `${desc.length}/40`
							: 'Stručný popis je povinný!'
					}
					sx={{ marginTop: '1rem' }}
				/>
				<TextField
					fullWidth
					multiline
					rows={4}
					value={detailDesc}
					label="Podrobný popis"
					sx={{ marginTop: '1rem' }}
					onChange={(e) => {
                        if (e.target.value.length == 0) {
                            setDetailDesc(undefined);
                            return;
                        }
						setDetailDesc(e.target.value);
					}}
				/>
			</DialogContent>
			<DialogActions>
				<LoadingButton
					loading={buttonLoading}
					variant="contained"
					color="success"
					startIcon={<EditIcon />}
					disabled={desc ? (desc.trim() === '' || desc.length > 40) : true}
                    onClick={handleEdit}
				>
					Potvrdit
				</LoadingButton>
				<Button onClick={close}>Zrušit</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditDescDialog;
