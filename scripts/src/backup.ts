import cron from 'node-cron'
import { doBackup } from './database/functions'

const main = async () => {
	console.log(`[${new Date().toLocaleString()}] Backuping...`)
	await doBackup()
	console.log(`[${new Date().toLocaleString()}] Backup done`)


	// Backup every day at 00:00
	cron.schedule('0 0 * * *', async () => {
		console.log(`[${new Date().toLocaleString()}] Backuping...`)
		await doBackup()
		console.log(`[${new Date().toLocaleString()}] Backup done`)
	})
}

main()
