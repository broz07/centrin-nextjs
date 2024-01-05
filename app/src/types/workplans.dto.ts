import { IFullDefect } from './defects.dto';

export interface IWorkplanSelect {
	year: number;
	week: number;
}

export interface IWorkplanDefect extends IFullDefect {
	workplan_year: number;
	workplan_week: number;
}

export interface IWorkplanStats {
	solved: number;
	unsolved: number;
}