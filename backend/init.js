const express = require("express")
const pool = require("../db/db")

const service = express()

const port = process.env.PORT || 2048
const loginKeys = []

async function validateLoginKey(user, loginKey){
	return loginKeys[user] == loginKey
}

async function validateCridentials(user, pass){
	var data = await pool.query("SELECT * FROM users WHERE username = '"+user+"' AND pass = '"+pass+"'")
	var isValid = data.rowCount > 0
	var key
	if (isValid){
		key = generateLoginKey()
	}
	return [data.rowCount > 0, key]
}

function generateLoginKey(user){
	if (loginKeys[user]){
		return loginKeys[user]
	}

	const uid = crypto.randomUUID()
	loginKeys[user] = uid
	return uid
}

service.get("/requestLogin", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*")
	var user = req.query.USERNAME
	var pass = req.query.PASS
	validateCridentials(user, pass).then((result) => {
		res.send(result)
	})	
})

service.listen(port, () => console.log("Listening on port " + port))