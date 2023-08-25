import { IndoorLocationType } from '@centrin/contexts/DefectPage/DefectAddContext';
import { ICorridor, IOutdoorLocation, IRoom } from './locations.dto';

export enum SeverityEnum {
	UNCLASSIFIED = 1,
	LOW = 2,
	MEDIUM = 3,
	HIGH = 4,
	CRITICAL = 5,
}

export interface IFullDefect {
	id: number;
	description: string;
	info?: string;
	note?: string;
	start_time: Date;
	end_time?: Date;
	solved: boolean;
	outdoor_id?: number;
	room_id?: number;
	corridor_id?: number;
	severity_id: number;
	created_by: number;
	assigned_to?: number;
	solved_by?: number;
	state_id: number;
	type_id: number;
	room_name?: string;
	corridor_name?: string;
	outdoor_name?: string;
	outdoor_description?: string;
	state_description: string;
	type_name: string;
	type_description?: string;
	floor_id?: number;
	floor_name?: string;
	building_id?: number;
	building_name?: string;
	created_by_username: string;
	created_by_name: string;
	created_by_surname: string;
	assigned_to_username?: string;
	assigned_to_name?: string;
	assigned_to_surname?: string;
	solved_by_username?: string;
	solved_by_name?: string;
	solved_by_surname?: string;
	severity: string;
	workplan_year?: number;
	workplan_week?: number;
}

export interface ISeverity {
	id: number;
	name: string;
}

export interface IDefectAdd {
	description: string;
	info?: string;
	type_id?: number;
	severity_id?: number;
	created_by: number;
	location: IOutdoorLocation | ICorridor | IRoom;
	location_type: 'outdoor' | IndoorLocationType;
}

export interface IDefectsPerBuilding {
	defect_count: number;
	building_id?: number;
	building_name?: string;
}
