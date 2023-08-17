'use server'
import { IFullDefect } from '@centrin/types/database';
import pool from './db';

export const getDefects = async (): Promise<IFullDefect[] | false> => {
    try {
        const client = await pool.connect();
        const query =`SELECT id, description, info, start_time, end_time, solved, outdoor_id, room_id, corridor_id, severity_id, created_by, assigned_to, solved_by, state_id, type_id, room_name, corridor_name, outdoor_name, outdoor_description, state_description, type_name, type_description, floor_id, floor_name, building_id, building_name, created_by_username, created_by_name, created_by_surname, assigned_to_username, assigned_to_name, assigned_to_surname, solved_by_username, solved_by_name, solved_by_surname, severity FROM centrin.all_defects_joined;`

        const result = await client.query<IFullDefect>(query);

        const data = result.rows;
        client.release();

        const defects: IFullDefect[] = data.map((defect) => {
            return {
                id: defect.id,
                description: defect.description,
                info: defect.info,
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
                severity: defect.severity
            }
        })

        return defects

    } catch (err) {
        console.log(err);
        return false
    }
}

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
