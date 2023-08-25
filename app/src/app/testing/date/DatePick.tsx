'use client';

import { DateTime } from 'luxon';
import { useState } from 'react';
import {
	DateTimePicker,
	DateTimePickerSelectedType,
	DateTimePickerSelectorType,
} from 'react-datetime-pickers';
import 'react-datetime-pickers/dist/index.css';
import styles from '@centrin/styles/testing/testing.module.scss';
import { formatWeekPick, getWeekNumber } from '@centrin/utils/functions';

const DatePick = () => {
	const [selected, setSelected] = useState<DateTimePickerSelectedType>()


	const handleDateChange = (date?: DateTimePickerSelectedType) => {
		console.debug('RangeDateTimePicker', 'onChange', date);
		const luxonDate = DateTime.fromJSDate(date as Date);
		const weekNumber = luxonDate.weekNumber;
		console.log(weekNumber);
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
							return `${formatWeekPick(date)}`;
						};
						if (date instanceof Array) return "";
						return "";
					}}

				/>
			</div>

			<pre>{JSON.stringify(selected)}</pre>
		</div>
	);
};

export default DatePick;
