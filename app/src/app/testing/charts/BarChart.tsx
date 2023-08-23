'use client';

import React from 'react';
import dynamic from 'next/dynamic';
// import 'tachyons/css/tachyons.min.css'; // You can use any CSS framework or styling method you prefer

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface BarChartProps {
	data: number[];
	categories: string[];
}

const BarChart: React.FC<BarChartProps> = ({ data, categories }) => {
	const options = {
		chart: {
			id: 'basic-bar',
		},
		xaxis: {
			categories: categories,
		},
	};

	const series = [
		{
			name: 'series-1',
			data: data,
		},
	];

	return (
		<ApexChart options={options} series={series} type="bar" height={350} />
	);
};

export default BarChart;
