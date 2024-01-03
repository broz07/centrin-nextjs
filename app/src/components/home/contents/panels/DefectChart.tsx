'use client'

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	ChartData,
	ChartOptions,
    Title
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

import { Pie } from 'react-chartjs-2';
import { IDefectCount} from "@centrin/types/defects.dto";
import { getDefectCounts } from "@centrin/utils/server/defects";

const DefectChart: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [chartData, setChartData] = useState<IDefectCount[]>([])

    useEffect(() => {
        const fetchCounts = async () => {
            const result = await getDefectCounts()

            if (result) {
                setChartData(result)
                setLoading(false)
            }
        }
        fetchCounts()
    }, [])

    const pieChartData: ChartData<'pie'> = {
        labels: chartData.map((item) => item.state),
        datasets: [
            {
                label: 'Počet závad',
                data: chartData.map((item) => item.count),
                backgroundColor: chartData.map((item) => item.color),
                borderColor: chartData.map((item) => item.color),
                borderWidth: 1,
            },
        ],
    }

    const options: ChartOptions<'pie'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                display: true,
            },
            title: {
                display: true,
                position: 'top',
                text: 'Celkový počet závad',
                font: {
                    size: 20,
                    weight: 'bold'
                },
            },
        },
		maintainAspectRatio: false,
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                padding: '0.5rem',
                // backgroundColor: 'green'
            }}
        >
			<Pie options={options} data={pieChartData} redraw />
        </Box>
    );
};

export default DefectChart;