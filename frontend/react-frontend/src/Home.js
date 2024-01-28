import React from "react"

function NavigateUpload(){
	window.open("/upload")
}

function Home(){
	return (
		<div>
			<h1>
				HOME PAGE
				<button onClick={NavigateUpload}>Upload</button>
			</h1>
		</div>
	)
}

export default Home