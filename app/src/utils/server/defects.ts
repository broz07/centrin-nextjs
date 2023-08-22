'use server';
import { IDefectAdd, IFullDefect, ISeverity } from '@centrin/types/defects.dto';
import pool from './db';

export const getAllDefects = async (): Promise<IFullDefect[] | false> => {
	try {
		const client = await pool.connect();
		const query = `SELECT id, description, info, start_time, end_time, solved, outdoor_id, room_id, corridor_id, severity_id, created_by, assigned_to, solved_by, state_id, type_id, room_name, corridor_name, outdoor_name, outdoor_description, state_description, type_name, type_description, floor_id, floor_name, building_id, building_name, created_by_username, created_by_name, created_by_surname, assigned_to_username, assigned_to_name, assigned_to_surname, solved_by_username, solved_by_name, solved_by_surname, severity FROM centrin.all_defects_joined ORDER BY start_time DESC;`;

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
		const query = `SELECT id, description, info, start_time, end_time, solved, outdoor_id, room_id, corridor_id, severity_id, created_by, assigned_to, solved_by, state_id, type_id, room_name, corridor_name, outdoor_name, outdoor_description, state_description, type_name, type_description, floor_id, floor_name, building_id, building_name, created_by_username, created_by_name, created_by_surname, assigned_to_username, assigned_to_name, assigned_to_surname, solved_by_username, solved_by_name, solved_by_surname, severity FROM centrin.all_defects_joined WHERE solved=FALSE ORDER BY start_time DESC;`;

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

// export const getDefects = async () => {
// 	const client = await pool.connect();
// 	const query = `
// SELECT
// 	d.*,
// 	r.name AS room_name,
// 	c.name AS corridor_name,
// 	o.name AS outdoor_name,
// 	o.description AS outdoor_description,
// 	ds.description AS state_description,
// 	dt.name AS type_name,
// 	dt.description AS type_description,
// 	f.id AS floor_id,
// 	f.name AS floor_name,
// 	b.id AS building_id,
// 	b.name AS building_name,
// 	uc.username as created_by_username,
// 	uc.name as created_by_name,
// 	uc.surname as created_by_surname,
// 	ua.username as assigned_to_username,
// 	ua.name as assigned_to_name,
// 	ua.surname as assigned_to_surname,
// 	us.username as solved_by_username,
// 	us.name as solved_by_name,
// 	us.surname as solved_by_surname,
// 	s.name as severity
// FROM
// 	centrin.defects d
// LEFT JOIN
// 	centrin.users uc ON uc.id = d.created_by
// LEFT JOIN
// 	centrin.users ua ON ua.id = d.assigned_to
// LEFT JOIN
// 	centrin.users us ON us.id = d.solved_by
// LEFT JOIN
// 	centrin.defect_states ds ON ds.id = d.state_id
// LEFT JOIN
// 	centrin.defect_types dt ON dt.id = d.type_id
// LEFT JOIN
// 	centrin.severity s ON s.id = d.severity_id
// LEFT JOIN
// 	centrin.rooms r ON r.id = d.room_id AND d.corridor_id IS NULL AND d.outdoor_id IS NULL
// LEFT JOIN
// 	centrin.corridors c ON c.id = d.corridor_id AND d.room_id IS NULL AND d.outdoor_id IS NULL
// LEFT JOIN
// 	centrin.outdoors o ON o.id = d.outdoor_id AND d.room_id IS NULL AND d.corridor_id IS NULL
// LEFT JOIN
//     centrin.floors f ON (r.floor_id = f.id AND d.room_id IS NOT NULL)
//     OR (c.floor_id = f.id AND d.corridor_id IS NOT NULL)
// LEFT JOIN
//     centrin.buildings b ON f.building_id  = b.id;
// `;

// 	const result = await client.query<any>(query);
// 	const data = result.rows;

// 	client.release();

// 	return data;
// };
