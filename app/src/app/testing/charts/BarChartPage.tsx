'use client';

import React, { useState } from 'react';
import BarChart from './BarChart';
import { Button } from '@mui/material';

const BarChartPage: React.FC = () => {
	const [data, setData] = useState<number[]>([
		30, 40, 45, 50, 49, 60, 70, 91, 125,
	]);

	const chartCategories = [
		'Category 1',
		'Category 2',
		'Category 3',
		'Category 4',
		'Category 5',
		'Category 6',
		'Category 7',
		'Category 8',
		'Category 9',
	];

	const multiplyEverySecondNumber = () => {
		const newData = data.map((number, index) => {
			if (index % 2 === 0) {
				return number;
			} else {
				return number * 2;
			}
		});
		setData(newData);
	};

	return (
		<div className="pa4">
			<h1>Simple Bar Chart Example</h1>
			<BarChart data={data} categories={chartCategories} />
			<Button variant="contained" onClick={multiplyEverySecondNumber}>
				Multiply every second number by 2
			</Button>
		</div>
	);
};

export default BarChartPage;
