import { Client } from 'ts-postgres'
import { PG_CONFIG } from './setup'
import { exec } from 'child_process'
import { promises as fs } from 'fs'

const fileExists = async (filename: string): Promise<boolean> => {
	try {
		await fs.access(filename)
		return true
	} catch (error) {
		return false
	}
}

export const doBackup = async () => {
	const PG_CLIENT = new Client(PG_CONFIG)
	await PG_CLIENT.connect()

	if (!(await fileExists('./backups'))) {
		await fs.mkdir('./backups')
	}

	const backupFileName = './backups/backup.dump'
	const plainBackupFileName = './backups/backup.sql'

	const renameOldBackupCommand = `mv ${backupFileName} ${backupFileName}.old && mv ${plainBackupFileName} ${plainBackupFileName}.old`

	const pgDumpCommand = `PGPASSWORD=${PG_CONFIG.password} pg_dump -h ${PG_CONFIG.host} -U ${PG_CONFIG.user} -d ${PG_CONFIG.database} --format=plain -f ${plainBackupFileName} && PGPASSWORD=${PG_CONFIG.password} pg_dump -h ${PG_CONFIG.host} -U ${PG_CONFIG.user} -d ${PG_CONFIG.database} -Fc -f ${backupFileName}`

	try {
		if (
			(await fileExists(backupFileName)) &&
			(await fileExists(plainBackupFileName))
		) {
			await new Promise((resolve, reject) => {
				exec(renameOldBackupCommand, (error, stdout, stderr) => {
					if (error) {
						console.error(`Error during backup: ${error.message}`)
						reject(error)
						return
					}

					if (stderr) {
						console.error(`Error during backup: ${stderr}`)
						reject(stderr)
						return
					}

					console.log('Old backup renamed')
					resolve(stdout)
				})
			})
		}

		await new Promise((resolve, reject) => {
			exec(pgDumpCommand, (error, stdout, stderr) => {
				if (error) {
					console.error(`Error during backup: ${error.message}`)
					reject(error)
					return
				}

				if (stderr) {
					console.error(`Error during backup: ${stderr}`)
					reject(stderr)
					return
				}

				console.log('Backup successful')
				resolve(stdout)
			})
		})

		// Disconnect from the PostgreSQL database
		// console.log('Disconnected from the database')
	} catch (error) {
		console.error(error)
	} finally {
		await PG_CLIENT.end()
	}
}

const maxRetries = 3
let currentRetries = 0

export const doRestore = async () => {
	const PG_CLIENT = new Client(PG_CONFIG)
	await PG_CLIENT.connect()

	const backupFileName = './backups/backup.dump'

	// const psqlRestoreCommand = `PGPASSWORD=${PG_CONFIG.password} psql -h ${PG_CONFIG.host} -U ${PG_CONFIG.user} -f ${backupFileName} `
	const pgRestoreCommand = `PGPASSWORD=${PG_CONFIG.password} pg_restore -h ${PG_CONFIG.host} -U ${PG_CONFIG.user} -d ${PG_CONFIG.database} --no-acl --no-owner --clean -Fc -j 4 --if-exists ${backupFileName}`

	try {
		// Execute pg_restore command to perform the restore
		await new Promise((resolve, reject) => {
			exec(pgRestoreCommand, (error, stdout, stderr) => {
				if (error) {
					console.error(`Error during restore: ${error.message}`)
					reject(error)
					return
				}

				if (stderr) {
					console.error(`Error during restore: ${stderr}`)
					reject(stderr)
					return
				}

				console.log('Restore successful')
				resolve(stdout)
			})
		})

		// Disconnect from the PostgreSQL database
		// console.log('Disconnected from the database')
	} catch (error) {
		console.error(error)
		currentRetries++
		if (currentRetries <= maxRetries) {
			console.log('Retrying...')
			await doRestore()
		} else {
			console.log('Max retries reached... exiting')
		}
	} finally {
		await PG_CLIENT.end()
	}
}
