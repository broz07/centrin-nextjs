'use server';

import pool from './db';

export const logLogin = async (user_id: number): Promise<boolean> => {
	try {
		const client = await pool.connect();
		const query = `INSERT INTO centrin.login_logs (user_id) VALUES (${user_id});`;

		await client.query(query);

		client.release();

		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};
