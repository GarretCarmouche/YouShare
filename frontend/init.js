const express = require("express")
const pool = require("../db/db")

const service = express()

const port = process.env.PORT || 2048

function loginPage(req, res){
	return res.send("Login page")
}

function validateCridentials(user, pass){
	var data = pool.query("SELECT * FROM users WHERE username = "+user+" AND pass = "+pass)
	return data
	//console.log(user === "admin")
	//console.log(pass === "admin")
	//return (user === "admin" && pass === "admin")
}

service.get("/", (req, res) => {
	return res.redirect("/login")
})

service.get("/login", (req, res) => {
	return loginPage(req, res)
})

service.get("/home", (req, res) => {
	return res.send("Home page")
})

service.get("/requestLogin", (req, res) => {
	var user = req.query.USERNAME
	var pass = req.query.PASS
	var result = validateCridentials(user, pass)
	return res.send(result)
})

service.listen(port, () => console.log("Listening on port " + port))