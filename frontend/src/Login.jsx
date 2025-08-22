import React from "react"
import { useState } from "react"
import { GetApiUrl, GetLoginKey, GetUsername, SetLoginKey, SetUsername, UpdateFiles } from './App'
import axios from 'axios'
import "./styles.css"
import logo from './assets/DesignerLogoOnly.png'

function Login(){
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [failureText, setFailureText] = useState(" ");

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
			}else{
				setFailureText("Incorrect username or password")
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
		<div className = "loginBackground">
			<div className = "loginForm">
				<div className="loginLogo">
					<img src={logo}/>
				</div>

				<form onSubmit={handleSubmit}>
					<div>
						<input
							className="loginField"
							type="text"
							placeholder="Username"
							value={username}
							onChange={(event) => setUsername(event.target.value)}
						/>
					</div>

					<div>
						<input
							className="loginField"
							type="password"
							placeholder="Password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
						/>
					</div>
					
					<div>
						<button type="submit" className = "loginButton">Login</button>
					</div>

					<div className="loginFailureText">{failureText}</div>
				</form>
			</div>
		</div>
	)
}

export default Login