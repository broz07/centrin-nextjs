import { Pool } from 'pg';

const pool = new Pool({
	user: 'postgres',
	host: 'postgres',
	database: 'postgres',
	password: 'root',
	port: 5432,
});

export default pool;
