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
}
/*
export interface IBuildingRecord {
	id: number;
	name: string;
}

export interface IFloorRecord {
	id: number;
	name: string;
	building_id: number;
	floor_caregiver_id?: number;
}

export interface IOutdoorRecord {
	id: number;
	name: string;
	description?: string;
}

export interface IRoomRecord {
	id: number;
	name: string;
	floor_id: number;
}

export interface ICorridorRecord {
	id: number;
	name: string;
	floor_id: number;
}

export interface ISeverityRecord {
	id: number;
	name: string;
}

export interface IStateRecord {
	id: number;
	description: string;
}

export interface ITypeRecord {
	id: number;
	name: string;
	description?: string;
}

export interface IDefectRecord {
	id: number;
	description: string;
	info?: string;
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
}

export interface IRoleRecord {
	id: number;
	name: string;
	description?: string;
}

export interface IUserRecord {
	id: number;
	name: string;
	surname: string;
	username: string;
	email?: string;
	password: string;
	role_id: number;
	supervisor_id: number;
}

export interface IShortUserDescription {
	id: number;
	name: string;
	surname: string;
	username: string;
}

// TODO: ADD Query interfaces

export interface IBuilding extends IBuildingRecord {}

export interface IFloor {
	id: number;
	name: string;
	building: IBuilding;
	floor_caregiver: IShortUserDescription;
}

export interface IRoom {
	id: number;
	name: string;
	floor: IFloor;
}

export interface ICorridor {
	id: number;
	name: string;
	floor: IFloor;
}

export interface IOutdoor extends IOutdoorRecord {}

export interface IDefect {
	id: number;
	description: string;
	info?: string;
	start_time: Date;
	end_time?: Date;
	solved: boolean;
	severity: ISeverityRecord;
	state: IStateRecord;
	type: ITypeRecord;
	created_by: IShortUserDescription;
	assigned_to?: IShortUserDescription;
	solved_by?: IShortUserDescription;
}

export interface IDefectFull extends IDefect {
	room?: IRoom;
	corridor: ICorridor;
	outdoor: IOutdoor;
}

export interface IRoomDefect extends IDefect {
	room: IRoom;
}

export interface ICorridorDefect extends IDefect {
	corridor: ICorridor;
}

export interface IOutdoorDefect extends IDefect {
	outdoor: IOutdoor;
}
*/
