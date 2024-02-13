import React from "react"
import { useState } from "react"
import axios from 'axios'

function UpdateLogin(){
	const [oldUsername, setOldUsername] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [newUsername, setNewUsername] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		axios.get("http://localhost:2048/updateLoginInfo", {
			params: {
				OLDUSERNAME: oldUsername,
				OLDPASS: oldPassword,
				NEWUSERNAME: newUsername,
				NEWPASS: newPassword
			}
		}).then(function(success){
			console.log(success)
			if(success.data){
				window.location.href = "/login"
			}
		}).catch(function(error){
			console.log(error)
		})
	}

	return (
		<form onSubmit={handleSubmit}>
		<input
			type="text"
			placeholder="OldUsername"
			value={oldUsername}
			onChange={(event) => setOldUsername(event.target.value)}
		/>
		<div></div>
		<input
			type="password"
			placeholder="OldPassword"
			value={oldPassword}
			onChange={(event) => setOldPassword(event.target.value)}
		/>
		<div></div>
		<input
			type="text"
			placeholder="NewUsername"
			value={newUsername}
			onChange={(event) => setNewUsername(event.target.value)}
		/>
		<div></div>
		<input
			type="password"
			placeholder="NewPassword"
			value={newPassword}
			onChange={(event) => setNewPassword(event.target.value)}
		/>
		<div></div>
		<button type="submit">Change login</button>
		</form>
	)
}

export default UpdateLogin