const { Pool } = require("pg")
const fs = require("fs")

const pool = new Pool({
	host: "db",
	port: 5432,
	user: "postgres",
	password: "root",
	database: "authentication"
})

module.exports = pool