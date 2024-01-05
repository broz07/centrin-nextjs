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
    PointElement,
    LineElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title, PointElement, LineElement);

import { Line } from 'react-chartjs-2';
import { IDefectsPerWeek, ISeverity } from '@centrin/types/defects.dto';
import {
	getDefectsOverTime, getSeverities,
} from '@centrin/utils/server/defects';
import { getSeverityColor } from '@centrin/utils/utils';

const WeeksChart: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [chartData, setChartData] = useState<IDefectsPerWeek[]>([]);
    const [severities, setSeverities] = useState<ISeverity[]>([]);

	useEffect(() => {
		const fetchCounts = async () => {
			const result = await getDefectsOverTime(10);
            const severities = await getSeverities();

			if (result && severities) {
				setChartData(result);
                setSeverities(severities);
				setLoading(false);
			}
		};
		fetchCounts();
	}, []);

    const lineChartDatasets: ChartData<'line'>['datasets'] = severities.map((severity) => {
        return {
            label: severity.name,
            data: chartData.filter((item) => item.severity == severity.id).map((item) => item.count),
            fill: false,
            borderColor: getSeverityColor(severity.id),
            backgroundColor: getSeverityColor(severity.id),
            tension: 0.1
        }
    });

	const lineChartData: ChartData<'line'> = {
		labels: chartData.filter((item) => item.severity == 1).map((item) => `${item.year} - ${item.week}. týden`),
        datasets: lineChartDatasets,
	};

	const options: ChartOptions<'line'> = {
		responsive: true,
		plugins: {
			legend: {
				position: 'bottom',
				display: true,
			},
			title: {
				display: true,
				position: 'top',
				text: 'Počet závad za posledních 10 týdnů',
				font: {
					size: 20,
					weight: 'bold',
				},
			},
		},
		maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
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
			<Line options={options} data={lineChartData} redraw />
		</Box>
	);
};

export default WeeksChart;
