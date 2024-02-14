const express = require("express")
const pool = require("../db/db")
const fs = require("fs")
const multer = require("multer")
const cors = require("cors")
const bcrypt = require("bcrypt")

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
const defaultUser = "admin"
const defaultPass = "admin"

var loginKeys = []
var downloadKeys = []
var uploadKeys = []

function clearLoginKeys(){
	loginKeys = []
}

async function checkDefaultUser(){
	const hashPass = bcrypt.hashSync(defaultPass, 10)
	await pool.query("CREATE TABLE IF NOT EXISTS users (username TEXT, pass TEXT)")
	
	pool.query("SELECT * FROM users WHERE username = '"+defaultUser+"'").then((data) => {
		if (data.rowCount == 0){
			console.log("Create default user")
			pool.query("INSERT INTO users (username, pass) VALUES ('"+defaultUser+"', '"+hashPass+"')")
		}
	})
}

async function updateLogin(oldUsername, newUsername, newPassword){
	const hashPass = bcrypt.hashSync(newPassword, 10)

	await pool.query("DELETE FROM users WHERE username = '"+oldUsername+"'")
	await pool.query("INSERT INTO users (username, pass) VALUES ('"+newUsername+"', '"+hashPass+"')")

	console.log("Updated login info", hashPass)
	pool.query("SELECT * FROM users").then((data) => {
		console.log(data.rows)
	})

	clearLoginKeys()
}

function validateLoginKey(user, loginKey){
	console.log("Validate login key",user, loginKey, loginKeys, loginKeys[user])
	if (user == null || loginKey == null){
		return false
	}

	if(loginKeys[user] == null){
		return false
	}

	return loginKeys[user] == loginKey
}

async function validateCridentials(user, pass){
	var hashPass = await pool.query("SELECT pass FROM users WHERE username = '"+user+"'")

	if (hashPass.rowCount == 0){
		return [false, null]
	}

	console.log("HashPass", hashPass.rows[0].pass)
	var isValid = bcrypt.compareSync(pass, hashPass.rows[0].pass)
	var key
	if (isValid){
		key = generateLoginKey(user)
	}
	return [isValid, key]
}

function generateUploadKey(){
	const uid = crypto.randomUUID()
	uploadKeys.push(uid)
	return uid
}

function validateUploadKey(key){
	if (key == null){
		return false
	}

	return uploadKeys.includes(key)
}

function generateDownloadKey(file){
	if (downloadKeys[file]){
		return downloadKeys[file]
	}

	const uid = crypto.randomUUID()
	downloadKeys[file] = uid
	return uid
}

function validateDownloadKey(file, key){
	if (file == null || key == null){
		return false
	}

	if (downloadKeys[file] == null){
		return false
	}

	return downloadKeys[file] == key
}

function generateLoginKey(user){
	if (loginKeys[user]){
		console.log("Get cached login key",user,loginKeys[user])
		return loginKeys[user]
	}

	const uid = crypto.randomUUID()
	loginKeys[user] = uid
	console.log("Generate login key",user,loginKeys[user])
	return uid
}

service.get("/updateLoginInfo", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*")
	var oldUser = req.query.OLDUSERNAME
	var oldPass = req.query.OLDPASS
	var newUser = req.query.NEWUSERNAME
	var newPass = req.query.NEWPASS

	validateCridentials(oldUser, oldPass).then((result) => {
		if (result[0]){
			updateLogin(oldUser, newUser, newPass).then(() => {
				res.send(true)
			}).catch((error) => {
				console.log(error)
				res.send(false)
			})
		}else{
			res.send(false)
		}
	}).catch((error) => {
		console.log(error)
		res.send(false)
	})
})

service.get("/requestLogin", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*")
	var user = req.query.USERNAME
	var pass = req.query.PASS
	validateCridentials(user, pass).then((result) => {
		res.send(result)
	})	
})

service.get("/getFileList", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*")
	var user = req.query.USERNAME
	var loginKey = req.query.LOGINKEY
	console.log("Get file list",user,loginKey)

	if(validateLoginKey(user, loginKey) == false){
		res.send(false)
		return
	}

	fs.readdirSync("/usr/src/app/uploads").forEach(file => {
		console.log("File list item",file)
	})
	res.send(fs.readdirSync("/usr/src/app/uploads"))
})

service.post("/uploadFile", upload.single("file"), (req, res) => {
	var user = req.body.username
	var loginKey = req.body.loginKey
	console.log("Upload file",user,loginKey)

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

service.post("/uploadFileWithSharedKey", upload.single("file"), (req, res) => {
	var sharedKey = req.body.key
	console.log("Upload with shared key",sharedKey)

	if(validateUploadKey(sharedKey) == false){
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

service.get("/downloadFile", (req, res) => {
	var user = req.query.USERNAME
	var loginKey = req.query.LOGINKEY
	var file = req.query.FILENAME
	
	if(validateLoginKey(user, loginKey) == false){
		res.send(false)
		return
	}

	res.download("/usr/src/app/uploads/"+file)
})

service.get("/downloadFileFromSharedLink", (req, res) => {
	var file = req.query.FILENAME
	var key = req.query.KEY

	if(validateDownloadKey(file, key) == false){
		res.send(false)
		return
	}

	res.download("/usr/src/app/uploads/"+file)
})


service.get("/createDownloadLink", (req, res) => {
	var user = req.query.USERNAME
	var loginKey = req.query.LOGINKEY
	var file = req.query.FILENAME

	if(validateLoginKey(user, loginKey) == false){
		res.send(false)
		return
	}

	var key = generateDownloadKey(file)
	var link = "http://localhost:3000/downloadFileFromLink?file="+file+"&key="+key
	res.send(link)
})

service.get("/createUploadLink", (req, res) => {
	var user = req.query.USERNAME
	var loginKey = req.query.LOGINKEY

	if(validateLoginKey(user, loginKey) == false){
		res.send(false)
		return
	}

	var key = generateUploadKey()
	var link = "http://localhost:3000/uploadFileFromLink?key="+key
	res.send(link)
})

checkDefaultUser()
service.listen(port, () => console.log("Listening on port " + port))