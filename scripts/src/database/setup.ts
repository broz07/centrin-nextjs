import { Configuration } from 'ts-postgres'

export const PG_CONFIG: Configuration = {
	host: 'postgres',
	port: 5432,
	user: 'postgres',
	password: 'root',
	database: 'postgres',
	// searchPath: "mservice"
}
