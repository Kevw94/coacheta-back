module.exports = {
	apps: [
	  {
		name: 'coacheta-backend',
		script: 'dist/main.js',
		instances: 1,
		autorestart: true,
		watch: true,
		max_memory_restart: '1G',
	  },
	],
  };