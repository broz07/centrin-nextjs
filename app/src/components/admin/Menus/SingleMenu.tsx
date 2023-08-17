'use client';

import { Item, Menu, RightSlot } from 'react-contexify';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import 'react-contexify/dist/ReactContexify.css';
import { useEffect, useState } from 'react';
import RemoveUserDialog from '../Dialogs/RemoveUserDialog';
import EditUserDialog from '../Dialogs/EditUserDialog';

interface Props {}

const SingleMenu: React.FC<Props> = () => {
	const [specialKey, setSpecialKey] = useState<string>('Ctrl');
	const [specialKey2, setSpecialKey2] = useState<string>('Alt');
	const [isAppleDevice, setIsAppleDevice] = useState<boolean>(false);

	const [userId, setUserId] = useState<number>();

	const [openRemoveDialog, setOpenRemoveDialog] = useState<boolean>(false);
	const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

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
		const propId = props?.userId as number;
		setUserId(propId);

		switch (id) {
			case 'single-user-edit':
				console.log('single-user-edit');
				setOpenEditDialog(true);
				break;
			case 'single-user-delete':
				console.log('single-user-delete');
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
				userIds={userId ? [userId] : undefined}
			/>
			<EditUserDialog
				open={openEditDialog}
				close={() => setOpenEditDialog(false)}
				userId={userId}
			/>
			<Menu id="single-user-menu" theme="dark">
				<Item
					id="single-user-edit"
					onClick={handleItemClick}
					keyMatcher={(e) => {
						e.preventDefault();
						return (
							(isAppleDevice && e.metaKey && e.key === 'e') ||
							(!isAppleDevice && e.ctrlKey && e.key === 'e')
						);
					}}
				>
					<ModeEditIcon />
					<span style={{ padding: '0 0.5rem' }}>Upravit</span>{' '}
					<RightSlot>{specialKey} + E</RightSlot>
				</Item>
				<Item
					id="single-user-delete"
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
					<span style={{ padding: '0 0.5rem' }}>Smazat</span>{' '}
					<RightSlot>{specialKey} + ⌫</RightSlot>
				</Item>
			</Menu>
		</>
	);
};

export default SingleMenu;
