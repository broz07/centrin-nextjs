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
	const { defects, setDefects, refresh, refreshFlag } = useDefectContext();

	useEffect(() => {
		const fetchDefects = async () => {
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
		};

		fetchDefects();
	}, [refreshFlag, setDefects]);

	return (
		<>
			<DefectsTable />
		</>
	);
};

export default DefectsContent;
