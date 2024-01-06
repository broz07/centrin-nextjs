'use server';

import { ILoginLog } from '@centrin/types/logging.dto';
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

export const getLoginLogs = async (
	limit?: number,
): Promise<ILoginLog[] | false> => {
	try {
		const client = await pool.connect();
		const query = `SELECT ll.time, u.name, u.surname FROM centrin.login_logs ll JOIN centrin.users u ON ll.user_id = u.id ORDER BY ll.time DESC ${
			limit ? `LIMIT ${limit}` : ''
		};`;

		const res = await client.query(query);

		const data = res.rows;

		client.release();

		return data.map((log: any) => {
			return {
				displayName: `${log.name} ${log.surname}`,
				timestamp: log.time,
			};
		});
	} catch (err) {
		console.log(err);
		return false;
	}
};
