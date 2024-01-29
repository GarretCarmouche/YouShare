import React from "react"

function NavigateUpload(){
	window.location.href = "/upload"
}

function NavigateFiles(){
	window.location.href = "/files"
}

function Home(){
	return (
		<div>
			<h1>
				HOME PAGE
			</h1>
			<button onClick={NavigateUpload}>Upload</button>
			<button onClick={NavigateFiles}>Files</button>
		</div>
	)
}

export default Home