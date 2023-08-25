'use client';

import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import {
	DateTimePicker,
	DateTimePickerSelectedType,
	DateTimePickerSelectorType,
} from 'react-datetime-pickers';
import 'react-datetime-pickers/dist/index.css';
import styles from '@centrin/styles/testing/testing.module.scss';
import { formatWeekPick, getWorkplanSelect } from '@centrin/utils/workplan';
import { IWorkplanSelect } from '@centrin/types/workplans.dto';

const DatePick = () => {
	const [selected, setSelected] = useState<DateTimePickerSelectedType>();
	const [selectedWorkplanSelect, setWorkplanSelect] =
		useState<IWorkplanSelect>();

	useEffect(() => {
		const date = new Date();
		setSelected(date);
		setWorkplanSelect(getWorkplanSelect(date));
	}, []);

	const handleDateChange = (date?: DateTimePickerSelectedType) => {
		setWorkplanSelect(getWorkplanSelect(date as Date));
		setSelected(date);
	};

	return (
		<div>
			<h1>Range Picker</h1>
			<div className={`${styles.wrapper}`}>
				<DateTimePicker
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

			{/* <pre>{JSON.stringify(selected)}</pre> */}
			{`${selectedWorkplanSelect?.year} - ${selectedWorkplanSelect?.week}`}
		</div>
	);
};

export default DatePick;
