'use client';

import { useDefectContext } from '@centrin/contexts/DefectPage/DefectContext';
import {
	NotificationPosition,
	NotificationType,
	notify,
} from '@centrin/utils/client/notify';
import { getAllDefects } from '@centrin/utils/server/defects';
import { useEffect } from 'react';
import DefectsTable from '@centrin/components/defects/DefectsTable';

const DefectHistoryContent: React.FC = () => {
	const { defects, setDefects, refresh, refreshFlag } = useDefectContext();

	useEffect(() => {
		const fetchDefects = async () => {
			const fetchedDefects = await getAllDefects();

			if (!fetchedDefects) {
				notify(
					'Nepodařilo se načíst závady! 😓',
					NotificationType.ERROR,
					NotificationPosition.BR,
					2000,
				);
				return;
			}

			setDefects(fetchedDefects);
		};

		fetchDefects();
	}, [refreshFlag, setDefects]);

	return (
		<>
			<DefectsTable />
		</>
	);
};

export default DefectHistoryContent;
