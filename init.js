const express = require("express")
const service = express()

const port = process.env.PORT || 2048

function loginPage(req, res){
	return res.send("Login page")
}

service.get("/", (req, res) => {
	return res.redirect("/login")
})

service.get("/login", (req, res) => {
	return loginPage(req, res)
})

service.listen(port, () => console.log("Listening on port " + port))