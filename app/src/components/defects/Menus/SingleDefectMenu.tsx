'use client';

import { useDefectContext } from '@centrin/contexts/DefectPage/DefectContext';
import { useUserContext } from '@centrin/contexts/UserContext';
// import { IFullDefect } from '@centrin/types/defects.dto';
import PersonIcon from '@mui/icons-material/Person';
import SpeedIcon from '@mui/icons-material/Speed';
import PersonOffIcon from '@mui/icons-material/PersonOff';
// import FlagIcon from '@mui/icons-material/Flag';
import EditIcon from '@mui/icons-material/Edit';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
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
import {
	assignDefect,
	deferDefect,
	moveDefectInProgress,
	unassignDefect,
} from '@centrin/utils/server/defects';
import { useEffect, useState } from 'react';
import { Item, Menu, RightSlot, Separator } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import ConfirmAssignDialog from '../Dialogs/ConfirmAssignDialog';
import SeverityChangeDialog from '../Dialogs/SeverityChangeDialog';
import CancelDefectDialog from '../Dialogs/CancelDefectDialog';
import CloseDefectDialog from '../Dialogs/CloseDefectDialog';
import ConfirmMoveInProgressDialog from '../Dialogs/ConfirmMoveInProgressDialog';
import MoveDownIcon from '@mui/icons-material/MoveDown';
// import MoveUpIcon from '@mui/icons-material/MoveUp';
import ConfirmMoveDeferredDialog from '../Dialogs/ConfirmMoveDeferredDialog';
import ConfirmResetDialog from '../Dialogs/ConfirmResetDialog';
import EditDescDialog from '../Dialogs/EditDescDialog';
import ConfirmDeleteDialog from '../Dialogs/ConfirmDeleteDialog';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AssignDialog from '../Dialogs/AssignDialog';

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

	const [openConfirmMoveInProgressDialog, setOpenConfirmMoveInProgressDialog] =
		useState<boolean>(false);

	const closeConfirmMoveInProgressDialog = () => {
		setOpenConfirmMoveInProgressDialog(false);
	};

	const [openConfirmDeferDialog, setOpenConfirmDeferDialog] =
		useState<boolean>(false);

	const closeConfirmDeferDialog = () => {
		setOpenConfirmDeferDialog(false);
	};

	const [openConfirmResetDialog, setOpenConfirmResetDialog] =
		useState<boolean>(false);

	const closeConfirmResetDialog = () => {
		setOpenConfirmResetDialog(false);
	};

	const [openEditDescDialog, setOpenEditDescDialog] = useState<boolean>(false);

	const closeEditDescDialog = () => {
		setOpenEditDescDialog(false);
	};

	const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] =
		useState<boolean>(false);

	const closeConfirmDeleteDialog = () => {
		setOpenConfirmDeleteDialog(false);
	};

	const [openAssignDialog, setOpenAssignDialog] = useState<boolean>(false)

	const closeAssignDialog = () => {
		setOpenAssignDialog(false)
	}

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
			case 'single-defect-move-in-progress':
				if (
					!selectedDefect.assigned_to ||
					selectedDefect.assigned_to == user.id
				) {
					const toast = loadToast(
						'Přesouvám do řešení...',
						NotificationPosition.BR,
					);

					const moved = await moveDefectInProgress(selectedDefect.id, user.id);

					if (moved) {
						updateToast(
							toast,
							'Úspěšně přesunuto do řešení!',
							NotificationType.SUCCESS,
							NotificationPosition.BR,
							2000,
						);
					} else {
						updateToast(
							toast,
							'Nepodařilo se přesunout do řešení!',
							NotificationType.ERROR,
							NotificationPosition.BR,
							2000,
						);
					}
					refresh();
				} else {
					setOpenConfirmMoveInProgressDialog(true);
				}
				break;
			case 'single-defect-defer':
				if (
					!selectedDefect.assigned_to ||
					selectedDefect.assigned_to == user.id
				) {
					const toast = loadToast(
						'Odkládám závadu...',
						NotificationPosition.BR,
					);

					const moved = await deferDefect(selectedDefect.id);

					if (moved) {
						updateToast(
							toast,
							'Úspěšně odloženo!',
							NotificationType.SUCCESS,
							NotificationPosition.BR,
							2000,
						);
					} else {
						updateToast(
							toast,
							'Nepodařilo se odložit!',
							NotificationType.ERROR,
							NotificationPosition.BR,
							2000,
						);
					}
					refresh();
				} else {
					setOpenConfirmDeferDialog(true);
				}
				break;
			case 'single-defect-reset':
				setOpenConfirmResetDialog(true);
				break;
			case 'single-defect-edit-desc':
				setOpenEditDescDialog(true);
				break;
			case 'single-defect-delete':
				setOpenConfirmDeleteDialog(true);
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
			<ConfirmMoveInProgressDialog
				open={openConfirmMoveInProgressDialog}
				close={closeConfirmMoveInProgressDialog}
			/>
			<ConfirmMoveDeferredDialog
				open={openConfirmDeferDialog}
				close={closeConfirmDeferDialog}
			/>
			<ConfirmResetDialog
				open={openConfirmResetDialog}
				close={closeConfirmResetDialog}
			/>
			<ConfirmDeleteDialog
				open={openConfirmDeleteDialog}
				close={closeConfirmDeleteDialog}
			/>
			<AssignDialog
				open={openAssignDialog}
				close={closeAssignDialog}
			/>
			<EditDescDialog open={openEditDescDialog} close={closeEditDescDialog} />
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
										<span style={{ padding: '0 0.5rem' }}>
											Uzavřít závadu
										</span>{' '}
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
								<Item
									id="single-defect-move-in-progress"
									onClick={handleItemClick}
								>
									<MoveDownIcon />
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
								<Item id="single-defect-defer" onClick={handleItemClick}>
									<UpdateIcon />
									<span style={{ padding: '0 0.5rem' }}>Odložit</span>{' '}
									<RightSlot>{specialKey} + ?</RightSlot>
								</Item>
							)}
						{user &&
							([RoleEnum.ADMIN].includes(user.role.id) ||
								selectedDefect.created_by == user.id) &&
							!selectedDefect.solved && (
								<Item id="single-defect-edit-desc" onClick={handleItemClick}>
									<EditIcon />
									<span style={{ padding: '0 0.5rem' }}>
										Upravit popisy
									</span>{' '}
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
						{user &&
							[RoleEnum.ADMIN, RoleEnum.MANAGER].includes(user.role.id) &&
							!selectedDefect.solved && (
								<Item id="single-defect-assign-to-user" onClick={handleItemClick}>
									<PersonIcon />
									<span style={{ padding: '0 0.5rem' }}>Přiřadit</span>{' '}
									<RightSlot>{specialKey} + A</RightSlot>
								</Item>
							)}
						{user &&
							[RoleEnum.ADMIN, RoleEnum.UDRZBA, RoleEnum.MANAGER].includes(
								user.role.id,
							) && (
								<>
									<Separator />
									<Item id="single-defect-reset" onClick={handleItemClick}>
										<RestartAltIcon />
										<span style={{ padding: '0 0.5rem' }}>
											Resetovat závadu
										</span>{' '}
										<RightSlot>{specialKey} + ?</RightSlot>
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
										<RightSlot>{specialKey} + ?</RightSlot>
									</Item>
								</>
							)}
						{user && user.role.id === RoleEnum.ADMIN && (
							<Item id="single-defect-delete" onClick={handleItemClick}>
								<DeleteForeverIcon />
								<span style={{ padding: '0 0.5rem' }}>Smazat závadu</span>{' '}
								<RightSlot>{specialKey} + ⌫</RightSlot>
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

export default SingleDefectMenu;
