const Pool = require('pg').Pool
const pool = new Pool({
	user: "postgres",
	password: "30031995hsdev",
	host: "localhost",
	port: 5432,
	database: "task_5"
})

module.exports = pool