'use server';
import pool from './db';
import {
	ICorridor,
	IOutdoorLocation,
	IRoom,
} from '@centrin/types/locations.dto';

export const getOutdoorLocations = async (): Promise<
	IOutdoorLocation[] | false
> => {
	try {
		const client = await pool.connect();
		const query = `SELECT id, name, description FROM centrin.outdoors order by name;`;

		const result = await client.query<IOutdoorLocation>(query);

		const data = result.rows;
		client.release();

		const locations: IOutdoorLocation[] = data.map((location) => {
			return {
				id: location.id,
				name: location.name,
				description: location.description,
			};
		});

		return locations;
	} catch (err) {
		console.log(err);
		return false;
	}
};

export const getCorridorLocations = async (): Promise<ICorridor[] | false> => {
	try {
		const client = await pool.connect();
		const query = `SELECT id, name, floor_id, floor_name, building_id, building_name FROM centrin.all_corridors_joined order by name;`;

		const result = await client.query<ICorridor>(query);

		const data = result.rows;
		client.release();

		const locations: ICorridor[] = data.map((location) => {
			return {
				id: location.id,
				name: location.name,
				floor_id: location.floor_id,
				floor_name: location.floor_name,
				building_id: location.building_id,
				building_name: location.building_name,
			};
		});

		return locations;
	} catch (err) {
		console.log(err);
		return false;
	}
};

export const getRoomLocations = async (): Promise<IRoom[] | false> => {
	try {
		const client = await pool.connect();
		const query = `SELECT id, name, floor_id, floor_name, building_id, building_name FROM centrin.all_rooms_joined order by name;`;

		const result = await client.query<IRoom>(query);

		const data = result.rows;
		client.release();

		const locations: IRoom[] = data.map((location) => {
			return {
				id: location.id,
				name: location.name,
				floor_id: location.floor_id,
				floor_name: location.floor_name,
				building_id: location.building_id,
				building_name: location.building_name,
			};
		});

		return locations;
	} catch (err) {
		console.log(err);
		return false;
	}
};
