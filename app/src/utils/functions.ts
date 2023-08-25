import { DateTime } from "luxon";

export const getWeekNumber = (date: Date) => {
    const luxonDate = DateTime.fromJSDate(date);
    return luxonDate.weekNumber;
}

export const formatWeekPick = (date: Date) => {
    return `${date.getFullYear()} - ${getWeekNumber(date)}`;
}