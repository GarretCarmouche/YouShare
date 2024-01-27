const { Pool } = require("pg")

const pool = new Pool({
	host: "db",
	port: 5432,
	user: "postgres",
	password: "admin",
	database: "authentication"
})

//pool.query("CREATE TABLE schools( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))")
//pool.query("CREATE TABLE users (username VARCHAR(100) PRIMARY KEY, pass VARCHAR(100)) ")
//pool.query("INSERT INTO users (username, pass) VALUES ($1, $2)", ["admin", "admin"])

/*async function test(){
	const result = await pool.query("select * from users where username = 'admin' and pass = 'admin'")
	console.log(result.rowCount > 0)
}

test()*/

module.exports = pool