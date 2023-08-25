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
import { Button } from '@mui/material';

interface Props {}

const WorkPlanContent: React.FC<Props> = () => {
	const {
		selectedWorkplan,
		loadingData,
		setLoadingData,
		setWorkplanDefects,
		workplanDefects,
		refreshFlag,
	} = useWorkplanContext();

	const [openAddToWorkplanDialog, setOpenAddToWorkplanDialog] =
		useState<boolean>(false);

	useEffect(() => {
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
	}, [selectedWorkplan, setLoadingData, setWorkplanDefects, refreshFlag]);

	return (
		<>
			{/* {`Selected workplan: ${selectedWorkplan?.year} - ${selectedWorkplan?.week} - loading? - ${loadingData}`} */}
			{loadingData ? (
				'Loading...'
			) : (
				<>
					{selectedWorkplan &&
						workplanDefects
							// .filter((defect) => (defect.workplan_year === selectedWorkplan.year && defect.workplan_week === selectedWorkplan.week))
							.map((defect) => defect.description) +
							' - ' +
							workplanDefects.length}
				</>
			)}
			<Button onClick={() => setOpenAddToWorkplanDialog(true)}>Otevřít</Button>

			<AddToWorkplanDialog
				open={openAddToWorkplanDialog}
				close={() => setOpenAddToWorkplanDialog(false)}
			/>
		</>
	);
};

export default WorkPlanContent;
