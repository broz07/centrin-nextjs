import { IFullDefect } from '@centrin/types/defects.dto';
import { IWorkplanSelect } from '@centrin/types/workplans.dto';
import { DateTime } from 'luxon';

export const formatLocation = (defect: IFullDefect): string => {
	if (defect.outdoor_id)
		return `${defect.outdoor_name} ${
			defect.outdoor_description ? `(${defect.outdoor_description})` : ''
		}`;
	if (defect.corridor_id)
		return `${defect.building_name} - ${defect.floor_name} - ${defect.corridor_name}`;
	if (defect.room_id)
		return `${defect.building_name} - ${defect.floor_name} - ${defect.room_name}`;
	return '';
};

export const formatDate = (
	date: Date,
	targetTimezone: string = 'Europe/Prague',
) => {
	const dt = DateTime.fromJSDate(date).setZone(targetTimezone);

	const formattedDate = dt.toFormat('dd.MM.yyyy HH:mm:ss');

	return formattedDate;
};

export const getWeekNumber = (date: Date) => {
	const luxonDate = DateTime.fromJSDate(date);
	return luxonDate.weekNumber;
};

export const getYear = (date: Date) => {
	const luxonDate = DateTime.fromJSDate(date);
	return luxonDate.year;
}

export const formatWeekPick = (date: Date) => {
	const weekEnd = new Date(date);
	weekEnd.setDate(weekEnd.getDate() + 6);

	return `${weekEnd.getFullYear()} - ${getWeekNumber(date)}`;
};

export const getWorkplanSelect = (date?: Date): IWorkplanSelect | undefined => {
	if (!date) return undefined;

	const weekEnd = new Date(date);
	weekEnd.setDate(weekEnd.getDate() + 6);

	return {
		year: weekEnd.getFullYear(),
		week: getWeekNumber(date),
	};
};

export function getDateRangeFromWorkplan(
	workplan: IWorkplanSelect,
): [Date, Date] {
	const weekStart = DateTime.fromObject({
		weekYear: workplan.year,
		weekNumber: workplan.week,
		weekday: 1, // Monday
	});
	const weekEnd = weekStart.plus({ days: 6 });

	return [weekStart.toJSDate(), weekEnd.toJSDate()];
}

export const getformatedDateRange = (
	workplan?: IWorkplanSelect,
	dateRange?: [Date, Date],
) => {
	if (!workplan && !dateRange)
		throw new Error('No workplan or date range provided');

	const [start, end] = dateRange
		? dateRange
		: getDateRangeFromWorkplan(workplan!);

	return `${start.getDate()}.${
		start.getMonth() + 1
	}.${start.getFullYear()} - ${end.getDate()}.${
		end.getMonth() + 1
	}.${end.getFullYear()}`;
};
