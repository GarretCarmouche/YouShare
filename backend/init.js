const express = require("express")
const pool = require("../db/db")
const fs = require("fs")
const multer = require("multer")
const cors = require("cors")

if (!fs.existsSync("/usr/src/app/uploads")){
	fs.mkdirSync("/usr/src/app/uploads")
}

const storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, "/usr/src/app/uploads")
	},
	filename: function(req, file, cb){
		cb(null, file.originalname)
	}
})
const upload = multer({storage})
const service = express()
service.use(cors())
service.use(express.json())

const port = process.env.PORT || 2048
const loginKeys = []

async function validateLoginKey(user, loginKey){
	if (user == null || loginKey == null){
		return false
	}

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

service.post("/uploadFile", upload.single("file"), (req, res) => {
	var user = req.body.username
	var loginKey = req.body.loginKey
	console.log(user)
	console.log(loginKey)

	if(validateLoginKey(user, loginKey) == false){
		res.send(false)
		return
	}

	console.log(req.body)
	console.log(req.file)

	fs.readdirSync("/usr/src/app/uploads").forEach(file => {
		console.log(file)
	})
	res.send(true)
})

service.listen(port, () => console.log("Listening on port " + port))

/*fs.mkdirSync("/usr/src/app/uploads")
fs.writeFileSync("/usr/src/app/uploads/test.txt", "Hello world!")
fs.readdirSync("/usr/src/app/uploads").forEach(file => {
	console.log(file)
})*/