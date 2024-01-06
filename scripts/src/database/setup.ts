import { Configuration } from 'ts-postgres'

import * as dotenv from 'dotenv';
dotenv.config();

export const PG_CONFIG: Configuration = {
	host: process.env.PG_HOST || 'localhost',
	port: parseInt(process.env.PG_PORT || "5432"),
	user: process.env.PG_USER || 'postgres',
	password: process.env.PG_PASSWORD || 'root',
	database: process.env.PG_DATABASE || 'postgres',
}
