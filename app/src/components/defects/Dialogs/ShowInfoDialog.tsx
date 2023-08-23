import { IFullDefect } from '@centrin/types/defects.dto';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from '@mui/material';
import { type } from 'os';

type DialogType = 'info' | 'note';

interface Props {
	open: boolean;
	close: () => void;
	defect?: IFullDefect;
	type: DialogType;
	reset: () => void;
}

const ShowInfoDialog: React.FC<Props> = ({
	open,
	close,
	defect,
	type,
	reset,
}) => {
	return (
		<Dialog open={open} maxWidth="sm" fullWidth onClose={reset}>
			<DialogTitle>
				<b>
					{`${
						type === 'info'
							? 'Detailní popis závady'
							: 'Závěrečná zpráva závady'
					}`}{' '}
					<i>{`"${defect?.description}"`}</i>:
				</b>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{type === 'info' ? defect?.info : defect?.note}
				</DialogContentText>
				{/* <TextField 
                    fullWidth
                    label="Detailní popis závady"
                    multiline
                    minRows={4}
                    maxRows={8}
                    value={defect?.info}
                    focused={false}
                    sx={{ mt: "1rem"}}
                /> */}
			</DialogContent>
			<DialogActions>
				<Button onClick={close}>Zavřít</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ShowInfoDialog;
