import { exit } from 'process'
import { doRestore } from './database/functions'

const main = async () => {
	const maxRetries = 5
	let currentRetries = 0
	try {
		await doRestore()
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
}

main()
