'use client';

import React, { useEffect } from 'react';
import { IDefectsPerBuilding } from '@centrin/types/defects.dto';
import PieChart from './PieChart';

interface PieChartProps {
	data: IDefectsPerBuilding[];
}

const PieChartPage: React.FC<PieChartProps> = ({ data }) => {
	const [chartData, setChartData] = React.useState<IDefectsPerBuilding[]>([]);

	useEffect(() => {
		setChartData(data);
	}, [data]);

	return <PieChart data={chartData} />;
};

export default PieChartPage;
