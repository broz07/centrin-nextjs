import pool from './db';

export const getDefects = async () =>{
    const client = await pool.connect();
    const query = `
SELECT 
	d.*,
	r.name AS room_name,
	c.name AS corridor_name,
	o.name AS outdoor_name,
	o.descriptiON AS outdoor_descriptiON,
	ds.descriptiON AS state_descriptiON,
	dt.name AS type_name,
	dt.descriptiON AS type_descriptiON,
	f.id AS floor_id,
	f.name AS floor_name,
	b.id AS building_id,
	b.name AS building_name,
	uc.username as created_by_username,
	uc.name as created_by_name,
	uc.surname as created_by_surname,
	ua.username as assigned_to_username,
	ua.name as assigned_to_name,
	ua.surname as assigned_to_surname,
	us.username as solved_by_username,
	us.name as solved_by_name,
	us.surname as solved_by_surname,
	s.name as severity
FROM 
	centrin.defects d
LEFT JOIN 
	centrin.users uc ON uc.id = d.created_by
LEFT JOIN 
	centrin.users ua ON ua.id = d.assigned_to 
LEFT JOIN 
	centrin.users us ON us.id = d.solved_by 
LEFT JOIN 
	centrin.defect_states ds ON ds.id = d.state_id
LEFT JOIN 
	centrin.defect_types dt ON dt.id = d.type_id
LEFT JOIN 
	centrin.severity s ON s.id = d.severity_id
LEFT JOIN 
	centrin.rooms r ON r.id = d.room_id AND d.corridor_id IS NULL AND d.outdoor_id IS NULL
LEFT JOIN
	centrin.corridors c ON c.id = d.corridor_id AND d.room_id IS NULL AND d.outdoor_id IS NULL
LEFT JOIN
	centrin.outdoors o ON o.id = d.outdoor_id AND d.room_id IS NULL AND d.corridor_id IS NULL
LEFT JOIN 
    centrin.floors f ON (r.floor_id = f.id AND d.room_id IS NOT NULL)
    OR (c.floor_id = f.id AND d.corridor_id IS NOT NULL)
LEFT JOIN
    centrin.buildings b ON f.building_id  = b.id;
`
        
    const result = await client.query<any>(query);
    const data = result.rows

	client.release();

    return data;
}