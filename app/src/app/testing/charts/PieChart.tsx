'use client';
import React from 'react';
import { IDefectsPerBuilding } from '@centrin/types/defects.dto';
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	ChartData,
	ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

import { Pie } from 'react-chartjs-2';

interface PieChartProps {
	data: IDefectsPerBuilding[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
	const categories = data.map((item) => {
		if (item.building) return item.building;
		return 'Venkovní prostory';
	});

	const chartData = data.map((item) => {
		return item.count;
	});
	const pieChartData: ChartData<'pie'> = {
		labels: categories,
		datasets: [
			{
				label: 'Počet závad',
				data: chartData,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	const options: ChartOptions<'pie'> = {
		responsive: true,
		plugins: {
			legend: {
				position: 'bottom',
				display: true,
			},
			title: {
				display: true,
				text: 'Počet závad na budovách',
			},
		},
		maintainAspectRatio: false,
	};

	return (
		<div style={{ height: '300px', width: '500px' }}>
			<Pie options={options} data={pieChartData} redraw />
		</div>
	);
};

export default PieChart;
