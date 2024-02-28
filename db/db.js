const { Pool } = require("pg")
const fs = require("fs")

const dbpass = fs.readFileSync("/run/secrets/db-password", "utf8")

const pool = new Pool({
	host: "db",
	port: 5432,
	user: "postgres",
	password: dbpass,
	database: "authentication"
})

module.exports = pool