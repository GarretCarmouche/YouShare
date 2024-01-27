import React from "react";
import { useState } from "react";

function Login(){
	const [username, serUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		// Implement authentication logic here
		console.log(password)
		console.log(username)
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