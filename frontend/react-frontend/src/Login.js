import React from "react"
import { useState } from "react"
import { GetApiUrl, GetLoginKey, GetUsername, SetLoginKey, SetUsername, UpdateFiles } from './App'
import axios from 'axios'

function Login(){
	const [username, serUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		console.log(password)
		console.log(username)
		axios.get(GetApiUrl()+"/requestlogin", {
			params: {
				USERNAME: username,
				PASS: password,
			}
		}).then(function (response){
			console.log(response)
			var success = response.data[0]
			var loginKey = response.data[1]
			console.log(success)
			console.log(loginKey)
			if(success){
				SetUsername(username)
				SetLoginKey(loginKey)
				console.log("Get usernanme", GetUsername())
				UpdateFiles()

				if(username === "admin"){
					window.location.href = "/updateLogin"
				}else{
					window.location.href = "/home"
				}
			}
		}).catch(function(error){
			console.log(error)
		})
	}

	if(GetUsername() != null && GetLoginKey() != null){
		if(GetUsername() === "admin"){
			window.location.href = "/updateLogin"
		}else{
			window.location.href = "/home"
		}
	}
	
	return (
		<form onSubmit={handleSubmit}>
		<input
			type="text"
			placeholder="Username"
			value={username}
			onChange={(event) => serUsername(event.target.value)}
		/>
		<input
			type="password"
			placeholder="Password"
			value={password}
			onChange={(event) => setPassword(event.target.value)}
		/>
		<button type="submit">Login</button>
		</form>
	)
}

export default Login