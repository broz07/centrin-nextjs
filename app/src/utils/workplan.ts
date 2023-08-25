import { IWorkplanSelect } from '@centrin/types/workplans.dto';
import { DateTime } from 'luxon';

export const getWeekNumber = (date: Date) => {
	const luxonDate = DateTime.fromJSDate(date);
	return luxonDate.weekNumber;
};

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
