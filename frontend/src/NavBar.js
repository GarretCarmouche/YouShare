import "./styles.css"
import React from "react"

function NavBar(){
	return(
		<nav className = "navBar">
			<div>
				<a href="/home" className = "navOption">Home</a>
				<a href="/upload" className = "navOption">Upload</a>
			</div>
		</nav>
	)
}

export default NavBar