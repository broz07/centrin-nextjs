'use server';

import { IWorkplanDefect, IWorkplanSelect } from '@centrin/types/workplans.dto';
import pool from './db';
import { IFullDefect } from '@centrin/types/defects.dto';

export const getWorkplanDefects = async (
	workplan: IWorkplanSelect,
): Promise<IWorkplanDefect[] | false> => {
	try {
		const client = await pool.connect();

		let query = `INSERT INTO centrin.workplans (workplan_year, workplan_week) VALUES (${workplan.year}, ${workplan.week}) ON CONFLICT (workplan_year, workplan_week) DO NOTHING;`;

		await client.query(query);

		query = `SELECT id, description, info, note, start_time, end_time, solved, outdoor_id, room_id, corridor_id, severity_id, created_by, assigned_to, solved_by, state_id, type_id, room_name, corridor_name, outdoor_name, outdoor_description, state_description, type_name, type_description, floor_id, floor_name, building_id, building_name, created_by_username, created_by_name, created_by_surname, assigned_to_username, assigned_to_name, assigned_to_surname, solved_by_username, solved_by_name, solved_by_surname, severity, workplan_year, workplan_week FROM centrin.all_workplans_joined WHERE workplan_year=${workplan.year} AND workplan_week=${workplan.week} ORDER BY start_time DESC;`;

		// console.log(query);

		const result = await client.query<IWorkplanDefect>(query);

		const data = result.rows;
		client.release();

		const defects: IWorkplanDefect[] = data.map((defect) => {
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
				workplan_year: defect.workplan_year,
				workplan_week: defect.workplan_week,
			};
		});

		// console.log(defects);

		return defects;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const getAvailableDefects = async (): Promise<IFullDefect[] | false> => {
	try {
		const client = await pool.connect();

		const query = `SELECT id, description, info, note, start_time, end_time, solved, outdoor_id, room_id, corridor_id, severity_id, created_by, assigned_to, solved_by, state_id, type_id, room_name, corridor_name, outdoor_name, outdoor_description, state_description, type_name, type_description, floor_id, floor_name, building_id, building_name, created_by_username, created_by_name, created_by_surname, assigned_to_username, assigned_to_name, assigned_to_surname, solved_by_username, solved_by_name, solved_by_surname, severity FROM centrin.all_defects_joined WHERE type_id IN (1,4) AND solved=false ORDER BY start_time DESC;`;

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

		console.log(defects);

		return defects;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const addDefectsToWorkplan = async (
	defectIds: number[],
	workplan: IWorkplanSelect,
): Promise<boolean> => {
	try {
		const client = await pool.connect();

		//insert many defect ids into workplan

		let query = `INSERT INTO centrin.defects_workplans_association (defect_id, workplan_year, workplan_week) VALUES `;

		for (let i = 0; i < defectIds.length; i++) {
			query += `(${defectIds[i]}, ${workplan.year}, ${workplan.week})`;
			if (i < defectIds.length - 1) {
				query += ',';
			}
		}

		query += ` ON CONFLICT (defect_id, workplan_year, workplan_week) DO NOTHING;`;

		// console.log(query);

		await client.query(query);

		client.release();

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const removeDefectFromWorkplan = async (
	defectId: number,
	workplan: IWorkplanSelect,
): Promise<boolean> => {
	try {
		const client = await pool.connect();

		const query = `DELETE FROM centrin.defects_workplans_association WHERE defect_id=${defectId} AND workplan_year=${workplan.year} AND workplan_week=${workplan.week};`;

		await client.query(query);

		client.release();

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};
