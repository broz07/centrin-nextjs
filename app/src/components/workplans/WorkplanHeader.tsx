'use client';
import { useWorkplanContext } from '@centrin/contexts/WorkplanPage/WorkplanContext';
import styles from '@centrin/styles/workplans/workplans.module.scss';
import { formatWeekPick, getWorkplanSelect } from '@centrin/utils/workplan';
import { useEffect, useState } from 'react';
import {
	DateTimePicker,
	DateTimePickerSelectedType,
	DateTimePickerSelectorType,
} from 'react-datetime-pickers';
import 'react-datetime-pickers/dist/index.css';

interface Props {}

const WorkplanHeader: React.FC<Props> = () => {
	const [selected, setSelected] = useState<DateTimePickerSelectedType>();

	const { setSelectedWorkplan, loadingData } = useWorkplanContext();

	useEffect(() => {
		const date = new Date();
		setSelected(date);
		setSelectedWorkplan(getWorkplanSelect(date));
		const element = document.querySelector('.react-datetime-pickers-overlay');
		if (element) {
			element.setAttribute('style', 'transform: translateX(-60px)');
		}
	}, [setSelectedWorkplan]);

	const handleDateChange = (date?: DateTimePickerSelectedType) => {
		setSelectedWorkplan(getWorkplanSelect(date as Date));
		setSelected(date);
	};

	return (
		<div className={styles.headerWrapper}>
			<div className={styles.headerGroup}>
				<h1>Týdenní pracovní plány</h1>
				{/* <span>TODO</span> */}
			</div>
			<div className={`${styles.wrapper}`}>
				<span>Týden: </span>
				<DateTimePicker
					disabled={loadingData}
					selected={selected}
					selector={DateTimePickerSelectorType.WEEK}
					onChange={handleDateChange}
					formatter={(date) => {
						if (date instanceof Date) {
							return `${formatWeekPick(date)}. týden`;
						}
						if (date instanceof Array) return '';
						return '';
					}}
				/>
			</div>
		</div>
	);
};

export default WorkplanHeader;
