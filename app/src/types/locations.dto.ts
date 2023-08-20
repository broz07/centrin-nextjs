export interface IOutdoorLocation {
	id: number;
	name: string;
	description?: string;
}

export interface ICorridor {
	id: number;
	name: string;
	floor_id: number;
	floor_name: string;
	building_id: number;
	building_name: string;
}

export interface IRoom {
	id: number;
	name: string;
	floor_id: number;
	floor_name: string;
	building_id: number;
	building_name: string;
}
