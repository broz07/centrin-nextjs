'use client';

import { getDefectsPerMaintainer } from '@centrin/utils/server/defects';
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
	RadialLinearScale,
    RadarController,
    Filler
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title, RadialLinearScale, RadarController, Filler);

import { Radar } from 'react-chartjs-2';
import { IDefectsPerMaintainer } from '@centrin/types/defects.dto';
import { chartPallette, makeRGBTransparent, } from '@centrin/utils/colors';

const MaintainersChart: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [chartData, setChartData] = useState<IDefectsPerMaintainer[]>([]);

	useEffect(() => {
		const fetchCounts = async () => {
			const result = await getDefectsPerMaintainer();

			if (result) {
				setChartData(result);
				setLoading(false);
			}
		};
		fetchCounts();
	}, []);

    let colorIndex = -1

	const radarChartDatasets: ChartData<'radar'>['datasets'] = chartData.map(
		(item) => {
            colorIndex++

			return {
				label: item.maintainer.displayName,
				data: [item.solved, item.assigned, item.irreparable, item.deferred],
				backgroundColor: makeRGBTransparent(chartPallette[colorIndex], 0.2),
                fill: true,
				borderColor: chartPallette[colorIndex],
				pointBackgroundColor: chartPallette[colorIndex],
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: chartPallette[colorIndex],
			};
		},
	);

	const radarChartData: ChartData<'radar'> = {
		labels: ['Vyřešené', 'Přidělené', 'Neopravitelné', 'Odložené'],
		datasets: radarChartDatasets,
	};

	const options: ChartOptions<'radar'> = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
                position: 'left',
			},
			title: {
				display: true,
				position: 'top',
				text: 'Výkonnost podřízených',
                font: {
					size: 20,
					weight: 'bold',
				},
			},
		},
		scales: {
			r: {
				angleLines: {
					display: false,
				},
                ticks:{
                    stepSize: 1
                }
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
			<Radar options={options} data={radarChartData} />
		</Box>
	);
};

export default MaintainersChart;
