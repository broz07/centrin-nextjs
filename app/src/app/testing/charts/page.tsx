import { getDefectCountPerBuilding } from '@centrin/utils/server/defects';
import { IDefectsPerBuilding } from '@centrin/types/defects.dto';
import PieChart from './PieChart';

const ChartPage = async () => {
	const defectCounts: IDefectsPerBuilding[] | false =
		await getDefectCountPerBuilding();

	// console.log(defectCounts);

	if (!defectCounts) {
		return <div>Failed to load data</div>;
	}

	return (
		<div>
			<PieChart data={defectCounts} />		
		</div>
	);
};

export default ChartPage;
