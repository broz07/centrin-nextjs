'use client';

import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	ChartData,
	ChartOptions,
	Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

import { Doughnut } from 'react-chartjs-2';
import { IWorkplanStats } from '@centrin/types/workplans.dto';
import { getWorkplanStats } from '@centrin/utils/server/workplan';
import {
	getSeverityColor,
	makeRGBATransparent,
	makeRGBTransparent,
} from '@centrin/utils/colors';
import { SeverityEnum } from '@centrin/types/defects.dto';

const WorkplanChart: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [chartData, setChartData] = useState<IWorkplanStats>({
		solved: 0,
		unsolved: 0,
	});

	useEffect(() => {
		const fetchCounts = async () => {
			const result = await getWorkplanStats();

			if (result) {
				setChartData(result);
				setLoading(false);
			}
		};
		fetchCounts();
	}, []);

	const pieChartData: ChartData<'doughnut'> = {
		labels: ['Hotové', 'Nedokončené'],
		datasets: [
			{
				label: 'Počet úkolů',
				data: [chartData.solved, chartData.unsolved],
				backgroundColor: [
					makeRGBTransparent(getSeverityColor(SeverityEnum.LOW), 0.7),
					makeRGBTransparent(getSeverityColor(SeverityEnum.CRITICAL), 0.7),
				],
				borderColor: [
					getSeverityColor(SeverityEnum.LOW),
					getSeverityColor(SeverityEnum.CRITICAL),
				],
				borderWidth: 1,
			},
		],
	};

	const options: ChartOptions<'doughnut'> = {
		responsive: true,
		plugins: {
			legend: {
				position: 'bottom',
				display: true,
			},
			title: {
				display: true,
				position: 'top',
				text: 'Stav plnění pracovního plánu',
				color: '#6e6e6e',
				font: {
					size: 20,
					weight: 'bold',
				},
			},
		},
		maintainAspectRatio: false,
	};

	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				padding: '0.5rem',
				// backgroundColor: 'green'
			}}
		>
			<Doughnut options={options} data={pieChartData} redraw />
		</Box>
	);
};

export default WorkplanChart;
