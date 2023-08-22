'use client';

import { useDefectContext } from '@centrin/contexts/DefectPage/DefectContext';
import { useUserContext } from '@centrin/contexts/UserContext';
// import { IFullDefect } from '@centrin/types/defects.dto';
import PersonIcon from '@mui/icons-material/Person';
import SpeedIcon from '@mui/icons-material/Speed';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import FlagIcon from '@mui/icons-material/Flag';
import UpdateIcon from '@mui/icons-material/Update';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { RoleEnum } from '@centrin/types/users.dto';
import {
	NotificationPosition,
	NotificationType,
	loadToast,
	notify,
	updateToast,
} from '@centrin/utils/client/notify';
import { assignDefect, unassignDefect } from '@centrin/utils/server/defects';
import { useEffect, useState } from 'react';
import { Item, Menu, RightSlot, Separator } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import ConfirmAssignDialog from '../Dialogs/ConfirmAssignDialog';
import SeverityChangeDialog from '../Dialogs/SeverityChangeDialog';
import CancelDefectDialog from '../Dialogs/CancelDefectDialog';
import CloseDefectDialog from '../Dialogs/CloseDefectDialog';

const SingleDefectMenu: React.FC = () => {
	const [specialKey, setSpecialKey] = useState<string>('Ctrl');
	const [specialKey2, setSpecialKey2] = useState<string>('Alt');
	const [isAppleDevice, setIsAppleDevice] = useState<boolean>(false);

	const [openConfirmAssignDialog, setOpenConfirmAssignDialog] =
		useState<boolean>(false);

	const closeConfirmAssignDialog = () => {
		setOpenConfirmAssignDialog(false);
	};

	const [openSeverityChangeDialog, setOpenSeverityChangeDialog] =
		useState<boolean>(false);

	const closeSeverityChangeDialog = () => {
		setOpenSeverityChangeDialog(false);
	};

	const [openCancelDefectDialog, setOpenCancelDefectDialog] =
		useState<boolean>(false);

	const closeCancelDefectDialog = () => {
		setOpenCancelDefectDialog(false);
	};

	const [openCloseDefectDialog, setOpenCloseDefectDialog] =
		useState<boolean>(false);

	const closeCloseDefectDialog = () => {
		setOpenCloseDefectDialog(false);
	};

	const { selectedDefect, refresh } = useDefectContext();

	const { user } = useUserContext();

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
		if (!selectedDefect) return;
		if (!user) return;

		switch (id) {
			case 'get-user':
				console.log(user);
				break;
			case 'single-defect-assign':
				if (!selectedDefect.assigned_to) {
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
						refresh();
					} else {
						updateToast(
							toast,
							'Nepodařilo se přiřadit závadu!',
							NotificationType.ERROR,
							NotificationPosition.BR,
							2000,
						);
						refresh();
					}
				} else {
					setOpenConfirmAssignDialog(true);
				}
				break;
			case 'single-defect-unassign':
				const toast = loadToast(
					'Odebírám přiřažení...',
					NotificationPosition.BR,
				);
				const unassigned = await unassignDefect(selectedDefect.id);

				if (unassigned) {
					updateToast(
						toast,
						'Úspěšně odebrané přižazení!',
						NotificationType.SUCCESS,
						NotificationPosition.BR,
						2000,
					);
					refresh();
				} else {
					updateToast(
						toast,
						'Nepodařilo se odebrat přiřazení!',
						NotificationType.ERROR,
						NotificationPosition.BR,
						2000,
					);
					refresh();
				}

				break;
			case 'single-defect-severity-change':
				setOpenSeverityChangeDialog(true);
				break;
			case 'single-defect-cancel':
				setOpenCancelDefectDialog(true);
				break;
			case 'single-defect-close':
				setOpenCloseDefectDialog(true);
				break;
			default:
				notify(
					'Work in progress! 🛠️',
					NotificationType.WARNING,
					NotificationPosition.BR,
					2000,
				);
				break;
		}
	};

	return (
		<>
			<ConfirmAssignDialog
				open={openConfirmAssignDialog}
				close={closeConfirmAssignDialog}
			/>
			<SeverityChangeDialog
				open={openSeverityChangeDialog}
				close={closeSeverityChangeDialog}
			/>
			<CancelDefectDialog
				open={openCancelDefectDialog}
				close={closeCancelDefectDialog}
			/>
			<CloseDefectDialog
				open={openCloseDefectDialog}
				close={closeCloseDefectDialog}
			/>
			<Menu id="single-defect-menu" theme="dark">
				{selectedDefect ? (
					<>
						<Item disabled id="get-user" onClick={handleItemClick}>
							{selectedDefect.description}
						</Item>
						{!selectedDefect.solved &&
							user &&
							[RoleEnum.ADMIN, RoleEnum.UDRZBA].includes(user.role.id) && (
								<Separator />
							)}
						{user &&
							([RoleEnum.ADMIN, RoleEnum.UDRZBA, RoleEnum.MANAGER].includes(
								user.role.id,
							) ||
								([RoleEnum.UKLIZEC].includes(user.role.id) &&
									selectedDefect.type_id == 2)) &&
							!selectedDefect.solved && (
								<>
									<Item id="single-defect-close" onClick={handleItemClick}>
										<TaskAltIcon />
										<span style={{ padding: '0 0.5rem' }}>Uzavřít</span>{' '}
										<RightSlot>{specialKey} + ?</RightSlot>
									</Item>
								</>
							)}
						{user &&
							(([RoleEnum.ADMIN, RoleEnum.UDRZBA].includes(user.role.id) &&
								![2].includes(selectedDefect.state_id)) ||
								([RoleEnum.UKLIZEC].includes(user.role.id) &&
									selectedDefect.type_id == 2 &&
									![2].includes(selectedDefect.state_id))) &&
							!selectedDefect.solved && (
								<Item>
									<FlagIcon />
									<span style={{ padding: '0 0.5rem' }}>
										Přesunout do řešení
									</span>{' '}
									<RightSlot>{specialKey} + ?</RightSlot>
								</Item>
							)}
						{user &&
							[RoleEnum.ADMIN, RoleEnum.UDRZBA].includes(user.role.id) &&
							![3].includes(selectedDefect.state_id) &&
							!selectedDefect.solved && (
								<Item>
									<UpdateIcon />
									<span style={{ padding: '0 0.5rem' }}>Odložit</span>{' '}
									<RightSlot>{specialKey} + ?</RightSlot>
								</Item>
							)}
						{user &&
							[RoleEnum.ADMIN, RoleEnum.UDRZBA].includes(user.role.id) &&
							!selectedDefect.solved && (
								<Item
									id="single-defect-severity-change"
									onClick={handleItemClick}
								>
									<SpeedIcon />
									<span style={{ padding: '0 0.5rem' }}>
										Změnit závažnost
									</span>{' '}
									<RightSlot>{specialKey} + ?</RightSlot>
								</Item>
							)}
						{((user &&
							[RoleEnum.ADMIN, RoleEnum.UDRZBA].includes(user.role.id) &&
							!selectedDefect.solved) ||
							(user &&
								[RoleEnum.UKLIZEC].includes(user.role.id) &&
								!selectedDefect.solved &&
								selectedDefect.type_id == 2)) &&
							selectedDefect.assigned_to != user.id && (
								<>
									<Separator />
									<Item id="single-defect-assign" onClick={handleItemClick}>
										<PersonIcon />
										<span style={{ padding: '0 0.5rem' }}>
											Přiřadit mně
										</span>{' '}
										<RightSlot>{specialKey} + A</RightSlot>
									</Item>
								</>
							)}
						{user &&
							user.id === selectedDefect.assigned_to &&
							!selectedDefect.solved && (
								<>
									<Separator />
									<Item id="single-defect-unassign" onClick={handleItemClick}>
										<PersonOffIcon />
										<span style={{ padding: '0 0.5rem' }}>
											Odebrat přiřazení
										</span>{' '}
										<RightSlot>{specialKey} + A</RightSlot>
									</Item>
								</>
							)}
						{((user &&
							[RoleEnum.ADMIN, RoleEnum.UDRZBA, RoleEnum.MANAGER].includes(
								user.role.id,
							)) ||
							(user && user.id === selectedDefect.created_by)) &&
							!selectedDefect.solved && (
								<>
									<Separator />
									<Item id="single-defect-cancel" onClick={handleItemClick}>
										<DoDisturbIcon />
										<span style={{ padding: '0 0.5rem' }}>
											Zrušit závadu
										</span>{' '}
										<RightSlot>{specialKey} + ⌫</RightSlot>
									</Item>
								</>
							)}
					</>
				) : (
					<Item disabled>Loading...</Item>
				)}
			</Menu>
		</>
	);
};

export default SingleDefectMenu;
