/** @type {import('next').NextConfig} */
const path = require('path');
// const { env } = require('./config')

const nextConfig = {
	// reactStrictMode: true,
	experimental: {
		serverActions: true,
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
};

module.exports = nextConfig;
