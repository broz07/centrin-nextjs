import cron from 'node-cron'
import { doBackup } from './database/functions'
import { exit } from 'process'

const main = async () => {
	const maxRetries = 5
	let currentRetries = 0
	try {
		console.log(`[${new Date().toLocaleString()}] Backuping...`)
		await doBackup()
		console.log(`[${new Date().toLocaleString()}] Backup done`)
	} catch (error) {
		console.error(error)
		currentRetries++
		if (currentRetries <= maxRetries) {
			console.log("I'll retry in 5 seconds...")
			await new Promise((resolve) => setTimeout(resolve, 5000))
			console.log('Retrying...')
			await main()
		} else {
			console.log('Max retries reached... exiting')
			exit(1)
		}
	}

	// Backup every day at 00:00
	cron.schedule('0 0 * * *', async () => {
		console.log(`[${new Date().toLocaleString()}] Backuping...`)
		await doBackup()
		console.log(`[${new Date().toLocaleString()}] Backup done`)
	})
}

main()
