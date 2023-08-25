'use client';

import { useDefectContext } from '@centrin/contexts/DefectPage/DefectContext';
import {
	NotificationPosition,
	NotificationType,
	notify,
} from '@centrin/utils/client/notify';
import { getActiveDefects } from '@centrin/utils/server/defects';
import { useEffect } from 'react';
import DefectsTable from './DefectsTable';

const DefectsContent: React.FC = () => {
	const { defects, setDefects, refreshFlag, setLoadingData } =
		useDefectContext();

	useEffect(() => {
		const fetchDefects = async () => {
			setLoadingData(true);
			const fetchedDefects = await getActiveDefects();

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
			setLoadingData(false);
		};

		fetchDefects();
	}, [refreshFlag, setDefects, setLoadingData]);

	return (
		<>
			<DefectsTable />
		</>
	);
};

export default DefectsContent;
