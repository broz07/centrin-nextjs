'use client'

import { IDefectsPerBuilding } from "@centrin/types/defects.dto";
import { getDefectCountPerBuilding } from "@centrin/utils/server/defects";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	ChartData,
	ChartOptions,
    Title,
    CategoryScale,
    LinearScale,
    BarElement
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement);

import { Bar } from 'react-chartjs-2';

const BuildingsChart: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [chartData, setChartData] = useState<IDefectsPerBuilding[]>([])

    useEffect(() => {
        const fetchCounts = async () => {
            const result = await getDefectCountPerBuilding()

            if (result) {
                setChartData(result)
                setLoading(false)
            }
        }
        fetchCounts()
    }, [])

    const barChartData: ChartData<'bar'> = {
        labels: chartData.map((item) => item.building),
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

    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                display: true,
            },
            title: {
                display: true,
                position: 'top',
                text: 'Počet závad podle budov',
                font: {
                    size: 20,
                    weight: 'bold'
                }
            },
            
        },
        scales: {
            y: {
                beginAtZero: true
            }
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
			<Bar options={options} data={barChartData} redraw />
        </Box>
    );
};

export default BuildingsChart;