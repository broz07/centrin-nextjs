'use client';

import { Dialog } from '@mui/material';

interface Props {
	open: boolean;
	close: () => void;
	closeParent: () => void;
}

const ConfirmCancelDialog: React.FC<Props> = () => {
	return <Dialog open={false}></Dialog>;
};

export default ConfirmCancelDialog;
