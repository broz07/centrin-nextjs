'use client';

import { useUserContext } from '@centrin/contexts/UserContext';
import { useWorkplanContext } from '@centrin/contexts/WorkplanPage/WorkplanContext';
import { useEffect, useState } from 'react';
import { Item, Menu, RightSlot, Separator } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import AssignDialog from '../Dialogs/AssignDialog';
import { RoleEnum } from '@centrin/types/users.dto';
import PersonIcon from '@mui/icons-material/Person';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import {
	NotificationPosition,
	NotificationType,
	loadToast,
	updateToast,
} from '@centrin/utils/client/notify';
import { removeDefectFromWorkplan } from '@centrin/utils/server/workplan';
import ConfirmDeleteDialog from '../Dialogs/ConfirmDeleteDialog';

interface Props {}

const WorkplanMenu: React.FC<Props> = () => {
	const { selectedDefect, refresh, selectedWorkplan } = useWorkplanContext();

	const { user } = useUserContext();

	const [specialKey, setSpecialKey] = useState<string>('Ctrl');
	const [specialKey2, setSpecialKey2] = useState<string>('Alt');
	const [isAppleDevice, setIsAppleDevice] = useState<boolean>(false);

	const [openAssignDialog, setOpenAssignDialog] = useState<boolean>(false);
	const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] =
		useState<boolean>(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (/Mac|iPod|iPhone|iPad/.test(navigator.userAgent)) {
				setIsAppleDevice(true);
				setSpecialKey('⌘');
				setSpecialKey2('⌥');
			}
		}
	}, []);

	const handleItemClick = async ({ id }: any) => {
		if (!selectedDefect || !selectedWorkplan || !user) return;

		switch (id) {
			case 'assign-to-user':
				setOpenAssignDialog(true);
				break;
			case 'delete-from-plan':
				setOpenConfirmDeleteDialog(true);
				break;
			default:
				break;
		}
	};

	return (
		<>
			<AssignDialog
				open={openAssignDialog}
				close={() => setOpenAssignDialog(false)}
			/>
			<ConfirmDeleteDialog
				open={openConfirmDeleteDialog}
				close={() => setOpenConfirmDeleteDialog(false)}
			/>
			<Menu id="workplan-menu" theme="dark">
				{selectedDefect ? (
					<>
						<Item disabled>{selectedDefect.description}</Item>
						{user &&
							[RoleEnum.ADMIN, RoleEnum.MANAGER].includes(user.role.id) && (
								<>
									<Separator />
									<Item id="assign-to-user" onClick={handleItemClick}>
										<PersonIcon />
										<span style={{ padding: '0 0.5rem' }}>
											Přiřadit uživatele
										</span>{' '}
										<RightSlot>{specialKey} + ?</RightSlot>
									</Item>
								</>
							)}
						{user &&
							[RoleEnum.ADMIN, RoleEnum.MANAGER].includes(user.role.id) && (
								<Item id="delete-from-plan" onClick={handleItemClick}>
									<PlaylistRemoveIcon />
									<span style={{ padding: '0 0.5rem' }}>
										Odebrat závadu z plánu
									</span>{' '}
									<RightSlot>{specialKey} + ?</RightSlot>
								</Item>
							)}
					</>
				) : (
					<Item disabled>Loading...</Item>
				)}
			</Menu>
		</>
	);
};

export default WorkplanMenu;
