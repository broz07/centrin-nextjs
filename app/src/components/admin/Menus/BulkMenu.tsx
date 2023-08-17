'use client';

import { useEffect, useState } from 'react';
import { Item, Menu, RightSlot } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveUserDialog from '../Dialogs/RemoveUserDialog';

interface Props {
	resetSelected: () => void;
}

const BulkMenu: React.FC<Props> = ({ resetSelected }) => {
	const [specialKey, setSpecialKey] = useState<string>('Ctrl');
	const [specialKey2, setSpecialKey2] = useState<string>('Alt');
	const [isAppleDevice, setIsAppleDevice] = useState<boolean>(false);

	const [userIds, setUserIds] = useState<number[]>();

	const [openRemoveDialog, setOpenRemoveDialog] = useState<boolean>(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			// const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);

			if (/Mac|iPod|iPhone|iPad/.test(navigator.userAgent)) {
				setIsAppleDevice(true);
				setSpecialKey('⌘');
				setSpecialKey2('⌥');
			}
		}
	}, []);

	const handleItemClick = ({ id, props }: any) => {
		// console.log(id, props);
		const propIds = props?.userIds as number[];
		setUserIds(propIds);

		// console.log(propIds);

		switch (id) {
			case 'bulk-user-edit':
				console.log('bulk-user-edit');
				break;
			case 'bulk-user-delete':
				console.log('bulk-user-delete');
				setOpenRemoveDialog(true);
				break;
			default:
				break;
		}
	};

	return (
		<>
			<RemoveUserDialog
				open={openRemoveDialog}
				close={() => setOpenRemoveDialog(false)}
				userIds={userIds}
				resetSelected={resetSelected}
			/>
			<Menu id="bulk-user-menu" theme="dark">
				<Item
					id="bulk-user-delete"
					onClick={handleItemClick}
					keyMatcher={(e) => {
						e.preventDefault();
						return (
							(isAppleDevice && e.metaKey && e.key === 'Backspace') ||
							(!isAppleDevice && e.ctrlKey && e.key === 'Backspace')
						);
					}}
				>
					<DeleteForeverIcon />
					<span style={{ padding: '0 0.5rem' }}>Smazat výběr</span>{' '}
					<RightSlot>{specialKey} + ⌫</RightSlot>
				</Item>
			</Menu>
		</>
	);
};

export default BulkMenu;
