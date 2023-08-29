'use client';

import { useWorkplanContext } from '@centrin/contexts/WorkplanPage/WorkplanContext';
import { IWorkplanSelect } from '@centrin/types/workplans.dto';
import {
	NotificationPosition,
	NotificationType,
	notify,
} from '@centrin/utils/client/notify';
import { getWorkplanDefects } from '@centrin/utils/server/workplan';
import { useEffect, useState } from 'react';
import AddToWorkplanDialog from './Dialogs/AddToWorkplanDialog';
import WorkplanTable from './WorkplanTable';

interface Props {}

const WorkPlanContent: React.FC<Props> = () => {
	const {
		selectedWorkplan,
		setLoadingData,
		setWorkplanDefects,
		refreshFlag,
		setSelectedDefect,
	} = useWorkplanContext();

	const [openAddToWorkplanDialog, setOpenAddToWorkplanDialog] =
		useState<boolean>(false);

	useEffect(() => {
		setSelectedDefect(undefined);
		const fetchWorkplanDefects = async (workplan: IWorkplanSelect) => {
			setLoadingData(true);

			const fetchedDefects = await getWorkplanDefects(workplan);

			if (!fetchedDefects) {
				setWorkplanDefects([]);
				notify(
					'Nepodařilo se načíst data o plánu práce! 🤕',
					NotificationType.ERROR,
					NotificationPosition.BR,
					2000,
				);
			} else {
				setWorkplanDefects(fetchedDefects);
			}

			setLoadingData(false);
		};

		if (selectedWorkplan) {
			fetchWorkplanDefects(selectedWorkplan);
			// console.log('fetching workplan defects');
		}
	}, [
		selectedWorkplan,
		setLoadingData,
		setWorkplanDefects,
		refreshFlag,
		setSelectedDefect,
	]);

	return (
		<>
			<WorkplanTable openAddDialog={() => setOpenAddToWorkplanDialog(true)} />
			<AddToWorkplanDialog
				open={openAddToWorkplanDialog}
				close={() => setOpenAddToWorkplanDialog(false)}
			/>
		</>
	);
};

export default WorkPlanContent;
