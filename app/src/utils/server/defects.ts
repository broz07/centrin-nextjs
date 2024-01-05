'use server';
import {
	IDefectAdd,
	IDefectsPerState,
	IDefectsPerBuilding,
	IFullDefect,
	ISeverity,
} from '@centrin/types/defects.dto';
import pool from './db';
import { IGetUsersQuery, IUser } from '@centrin/types/users.dto';
import { chartPallette, randomRGB } from '../utils';

export const getAllDefects = async (): Promise<IFullDefect[] | false> => {
	try {
		const client = await pool.connect();
		const query = `SELECT id, description, info, note, start_time, end_time, solved, outdoor_id, room_id, corridor_id, severity_id, created_by, assigned_to, solved_by, state_id, type_id, room_name, corridor_name, outdoor_name, outdoor_description, state_description, type_name, type_description, floor_id, floor_name, building_id, building_name, created_by_username, created_by_name, created_by_surname, assigned_to_username, assigned_to_name, assigned_to_surname, solved_by_username, solved_by_name, solved_by_surname, severity FROM centrin.all_defects_joined ORDER BY start_time DESC;`;

		const result = await client.query<IFullDefect>(query);

		const data = result.rows;
		client.release();

		const defects: IFullDefect[] = data.map((defect) => {
			return {
				id: defect.id,
				description: defect.description,
				info: defect.info,
				note: defect.note,
				start_time: defect.start_time,
				end_time: defect.end_time,
				solved: defect.solved,
				outdoor_id: defect.outdoor_id,
				room_id: defect.room_id,
				corridor_id: defect.corridor_id,
				severity_id: defect.severity_id,
				created_by: defect.created_by,
				assigned_to: defect.assigned_to,
				solved_by: defect.solved_by,
				state_id: defect.state_id,
				type_id: defect.type_id,
				room_name: defect.room_name,
				corridor_name: defect.corridor_name,
				outdoor_name: defect.outdoor_name,
				outdoor_description: defect.outdoor_description,
				state_description: defect.state_description,
				type_name: defect.type_name,
				type_description: defect.type_description,
				floor_id: defect.floor_id,
				floor_name: defect.floor_name,
				building_id: defect.building_id,
				building_name: defect.building_name,
				created_by_username: defect.created_by_username,
				created_by_name: defect.created_by_name,
				created_by_surname: defect.created_by_surname,
				assigned_to_username: defect.assigned_to_username,
				assigned_to_name: defect.assigned_to_name,
				assigned_to_surname: defect.assigned_to_surname,
				solved_by_username: defect.solved_by_username,
				solved_by_name: defect.solved_by_name,
				solved_by_surname: defect.solved_by_surname,
				severity: defect.severity,
			};
		});

		return defects;
	} catch (err) {
		console.log(err);
		return false;
	}
};

export const getActiveDefects = async (): Promise<IFullDefect[] | false> => {
	try {
		const client = await pool.connect();
		const query = `SELECT id, description, info, note, start_time, end_time, solved, outdoor_id, room_id, corridor_id, severity_id, created_by, assigned_to, solved_by, state_id, type_id, room_name, corridor_name, outdoor_name, outdoor_description, state_description, type_name, type_description, floor_id, floor_name, building_id, building_name, created_by_username, created_by_name, created_by_surname, assigned_to_username, assigned_to_name, assigned_to_surname, solved_by_username, solved_by_name, solved_by_surname, severity FROM centrin.all_defects_joined WHERE solved=FALSE ORDER BY start_time DESC;`;

		const result = await client.query<IFullDefect>(query);

		const data = result.rows;
		client.release();

		const defects: IFullDefect[] = data.map((defect) => {
			return {
				id: defect.id,
				description: defect.description,
				info: defect.info,
				note: defect.note,
				start_time: defect.start_time,
				end_time: defect.end_time,
				solved: defect.solved,
				outdoor_id: defect.outdoor_id,
				room_id: defect.room_id,
				corridor_id: defect.corridor_id,
				severity_id: defect.severity_id,
				created_by: defect.created_by,
				assigned_to: defect.assigned_to,
				solved_by: defect.solved_by,
				state_id: defect.state_id,
				type_id: defect.type_id,
				room_name: defect.room_name,
				corridor_name: defect.corridor_name,
				outdoor_name: defect.outdoor_name,
				outdoor_description: defect.outdoor_description,
				state_description: defect.state_description,
				type_name: defect.type_name,
				type_description: defect.type_description,
				floor_id: defect.floor_id,
				floor_name: defect.floor_name,
				building_id: defect.building_id,
				building_name: defect.building_name,
				created_by_username: defect.created_by_username,
				created_by_name: defect.created_by_name,
				created_by_surname: defect.created_by_surname,
				assigned_to_username: defect.assigned_to_username,
				assigned_to_name: defect.assigned_to_name,
				assigned_to_surname: defect.assigned_to_surname,
				solved_by_username: defect.solved_by_username,
				solved_by_name: defect.solved_by_name,
				solved_by_surname: defect.solved_by_surname,
				severity: defect.severity,
			};
		});

		return defects;
	} catch (err) {
		console.log(err);
		return false;
	}
};

export const getDefect = async (id: number): Promise<IFullDefect | false> => {
	try {
		const client = await pool.connect();
		const query = `SELECT id, description, info, start_time, end_time, solved, outdoor_id, room_id, corridor_id, severity_id, created_by, assigned_to, solved_by, state_id, type_id, room_name, corridor_name, outdoor_name, outdoor_description, state_description, type_name, type_description, floor_id, floor_name, building_id, building_name, created_by_username, created_by_name, created_by_surname, assigned_to_username, assigned_to_name, assigned_to_surname, solved_by_username, solved_by_name, solved_by_surname, severity FROM centrin.all_defects_joined WHERE id=${id};`;

		const result = await client.query<IFullDefect>(query);

		const data = result.rows;

		client.release();

		if (data.length === 0) {
			return false;
		}

		const defect: IFullDefect = {
			id: data[0].id,
			description: data[0].description,
			info: data[0].info,
			note: data[0].note,
			start_time: data[0].start_time,
			end_time: data[0].end_time,
			solved: data[0].solved,
			outdoor_id: data[0].outdoor_id,
			room_id: data[0].room_id,
			corridor_id: data[0].corridor_id,
			severity_id: data[0].severity_id,
			created_by: data[0].created_by,
			assigned_to: data[0].assigned_to,
			solved_by: data[0].solved_by,
			state_id: data[0].state_id,
			type_id: data[0].type_id,
			room_name: data[0].room_name,
			corridor_name: data[0].corridor_name,
			outdoor_name: data[0].outdoor_name,
			outdoor_description: data[0].outdoor_description,
			state_description: data[0].state_description,
			type_name: data[0].type_name,
			type_description: data[0].type_description,
			floor_id: data[0].floor_id,
			floor_name: data[0].floor_name,
			building_id: data[0].building_id,
			building_name: data[0].building_name,
			created_by_username: data[0].created_by_username,
			created_by_name: data[0].created_by_name,
			created_by_surname: data[0].created_by_surname,
			assigned_to_username: data[0].assigned_to_username,
			assigned_to_name: data[0].assigned_to_name,
			assigned_to_surname: data[0].assigned_to_surname,
			solved_by_username: data[0].solved_by_username,
			solved_by_name: data[0].solved_by_name,
			solved_by_surname: data[0].solved_by_surname,
			severity: data[0].severity,
		};

		return defect;
	} catch (err) {
		console.log(err);
		return false;
	}
};

export const getSeverities = async (): Promise<ISeverity[] | false> => {
	try {
		const client = await pool.connect();
		const query = `SELECT * FROM centrin.severity;`;

		const result = await client.query<ISeverity>(query);

		const data = result.rows;
		client.release();

		const severities: ISeverity[] = data.map((severity) => {
			return {
				id: severity.id,
				name: severity.name,
			};
		});

		return severities;
	} catch (err) {
		console.log(err);
		return false;
	}
};

export const addDefect = async (defect: IDefectAdd): Promise<boolean> => {
	try {
		const client = await pool.connect();

		let query = '';

		if (defect.location_type === 'outdoor') {
			query = `INSERT INTO centrin.defects (description, ${
				defect.info ? 'info, ' : ''
			}${defect.type_id ? 'type_id, ' : ''}${
				defect.severity_id ? 'severity_id, ' : ''
			}created_by, outdoor_id) VALUES ('${defect.description}', ${
				defect.info ? `'${defect.info}', ` : ''
			}${defect.type_id ? `${defect.type_id}, ` : ''}${
				defect.severity_id ? `${defect.severity_id}, ` : ''
			}${defect.created_by}, ${defect.location.id});`;
		}

		if (defect.location_type === 'corridor') {
			query = `INSERT INTO centrin.defects (description, ${
				defect.info ? 'info, ' : ''
			}${defect.type_id ? 'type_id, ' : ''}${
				defect.severity_id ? 'severity_id, ' : ''
			}created_by, corridor_id) VALUES ('${defect.description}', ${
				defect.info ? `'${defect.info}', ` : ''
			}${defect.type_id ? `${defect.type_id}, ` : ''}${
				defect.severity_id ? `${defect.severity_id}, ` : ''
			}${defect.created_by}, ${defect.location.id});`;
		}

		if (defect.location_type === 'room') {
			query = `INSERT INTO centrin.defects (description, ${
				defect.info ? 'info, ' : ''
			}${defect.type_id ? 'type_id, ' : ''}${
				defect.severity_id ? 'severity_id, ' : ''
			}created_by, room_id) VALUES ('${defect.description}', ${
				defect.info ? `'${defect.info}', ` : ''
			}${defect.type_id ? `${defect.type_id}, ` : ''}${
				defect.severity_id ? `${defect.severity_id}, ` : ''
			}${defect.created_by}, ${defect.location.id});`;
		}

		await client.query(query);

		client.release();

		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

export const assignDefect = async (
	defectId: number,
	userId: number,
): Promise<boolean> => {
	try {
		const client = await pool.connect();

		const query = `UPDATE centrin.defects SET assigned_to=${userId} WHERE id=${defectId}`;

		await client.query(query);

		client.release();

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const unassignDefect = async (defectId: number): Promise<boolean> => {
	try {
		const client = await pool.connect();
		const query = `UPDATE centrin.defects SET assigned_to=NULL WHERE id=${defectId}`;

		await client.query(query);

		client.release();

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const changeSeverity = async (
	defectId: number,
	severityId: number,
): Promise<boolean> => {
	try {
		const client = await pool.connect();
		const query = `UPDATE centrin.defects SET severity_id=${severityId} WHERE id=${defectId}`;

		await client.query(query);

		client.release();

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const cancelDefect = async (
	defectId: number,
	note: string,
	userId: number,
): Promise<boolean> => {
	try {
		const client = await pool.connect();
		const query = `UPDATE centrin.defects SET state_id=8, note='${note}', solved=TRUE, end_time=CURRENT_TIMESTAMP, solved_by=${userId} WHERE id=${defectId}`;

		await client.query(query);

		client.release();

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const closeDefect = async (
	defectId: number,
	stateId: number,
	userId: number,
	note?: string,
	assignTo?: number,
): Promise<boolean> => {
	try {
		// console.log(defectId, stateId, userId, note, assignTo);
		const client = await pool.connect();
		const query = `UPDATE centrin.defects SET state_id=${stateId}, solved=TRUE, end_time=CURRENT_TIMESTAMP, solved_by=${userId}${
			assignTo ? `, assigned_to=${assignTo}` : ''
		}${note ? `, note='${note}'` : ''} WHERE id=${defectId};`;

		// console.log(query);

		await client.query(query);

		client.release();

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const moveDefectInProgress = async (
	defectId: number,
	assignTo?: number,
): Promise<boolean> => {
	try {
		const client = await pool.connect();

		const query = `UPDATE centrin.defects SET state_id=2${
			assignTo ? `, assigned_to=${assignTo}` : ''
		} WHERE id=${defectId};`;

		// console.log(query);

		await client.query(query);

		client.release();

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const deferDefect = async (
	defectId: number,
	assignTo?: number,
): Promise<boolean> => {
	try {
		const client = await pool.connect();

		const query = `UPDATE centrin.defects SET state_id=3${
			assignTo ? `, assigned_to=${assignTo}` : ''
		} WHERE id=${defectId};`;

		// console.log(query);

		await client.query(query);

		client.release();

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const resetDefect = async (defectId: number): Promise<boolean> => {
	try {
		const client = await pool.connect();

		const query = `UPDATE centrin.defects SET start_time=CURRENT_TIMESTAMP, end_time=NULL, solved=FALSE, assigned_to=NULL, solved_by=NULL, state_id=1, note=NULL WHERE id=${defectId};`;

		await client.query(query);

		client.release();

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const deleteDefect = async (defectId: number): Promise<boolean> => {
	try {
		const client = await pool.connect();

		const query = `DELETE FROM centrin.defects WHERE id=${defectId};`;

		await client.query(query);

		client.release();

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const changeDefectDesc = async (
	defectId: number,
	desc: string,
	info?: string,
): Promise<boolean> => {
	try {
		const client = await pool.connect();
		const query = `UPDATE centrin.defects SET description='${desc}', info=${
			info ? `'${info}'` : 'NULL'
		} WHERE id=${defectId};`;

		await client.query(query);

		client.release();

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const getDefectCountPerBuilding = async (): Promise<
	IDefectsPerBuilding[] | false
> => {
	try {
		const client = await pool.connect();
		const query = `SELECT COUNT(id) as defect_count, building_name FROM centrin.all_defects_joined GROUP BY building_name ORDER BY building_name`;

		const result = await client.query<any>(query);

		const data = result.rows;

		client.release();

		let palletteIndex = 0;

		const defects: IDefectsPerBuilding[] = data.map((defect: any) => {

			if (defect.building_name === null) {
				return {
					count: parseInt(defect.defect_count as string),
					building: 'Venkovní prostory',
					// color: randomRGB(),
					color: chartPallette[palletteIndex++],
				};
			}

			return {
				count: parseInt(defect.defect_count as string),
				building: defect.building_name,
				// color: randomRGB(),
				color: chartPallette[palletteIndex++],
			};
		});

		return defects;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const assignDefectToUser = async (
	defectId: number,
	userId: number,
): Promise<boolean> => {
	try {
		const client = await pool.connect();

		const query = `UPDATE centrin.defects SET assigned_to=${userId} WHERE id=${defectId};`;

		await client.query(query);

		client.release();

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const getAvailableUsers = async (): Promise<IUser[] | false> => {
	try {
		const client = await pool.connect();

		const query = `SELECT users.id AS id, users.name, users.surname, users.username, users.email, users.role_id, roles.name as role_name, roles.description as role_desc FROM centrin.users AS users JOIN centrin.roles AS roles ON users.role_id=roles.id WHERE users.role_id in (4,8) ORDER by users.id;`;

		const result = await client.query<IGetUsersQuery>(query);

		const data = result.rows;

		client.release();

		const users: IUser[] = data.map((user) => {
			return {
				id: user.id,
				name: user.name,
				surname: user.surname,
				username: user.username,
				email: user.email,
				displayName: `${user.name} ${user.surname}`,
				role: {
					id: user.role_id,
					name: user.role_name,
					description: user.role_desc,
				},
			};
		});

		return users;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const getDefectCounts = async (): Promise<IDefectsPerState[] | false> => {
	try {
		const counts:IDefectsPerState[] = []
		const client = await pool.connect();

		let query = `SELECT COUNT(id) AS count FROM centrin.defects WHERE defects.state_id = 1`

		let result = await client.query(query);

		let data = result.rows;

		counts.push({
			state: 'Nové',
			count: parseInt(data[0].count),
			color: 'rgba(75, 192, 192, 1)'
		})

		query = `SELECT COUNT(id) AS count FROM centrin.defects WHERE defects.state_id IN (3,7)`

		result = await client.query(query);

		data = result.rows;

		counts.push({
			state: 'Odložené',
			count: parseInt(data[0].count),
			color: 'rgba(54, 162, 235, 1)'
		})

		query = `SELECT COUNT(id) AS count FROM centrin.defects WHERE defects.state_id IN (4,5,6,8)`

		result = await client.query(query);

		data = result.rows;

		counts.push({
			state: 'Uzavřené',
			count: parseInt(data[0].count),
			color: 'rgba(255, 99, 132, 1)'
		})

		query = `SELECT COUNT(id) AS count FROM centrin.defects WHERE defects.state_id = 2`

		result = await client.query(query);

		data = result.rows;

		counts.push({
			state: 'V řešení',
			count: parseInt(data[0].count),
			color: 'rgba(255, 206, 86, 1)'
		})

		client.release();

		return counts
	} catch (error) {
		console.log(error);
		return false;
	}
}
