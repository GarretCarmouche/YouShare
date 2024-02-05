import React, { useState } from "react"
import axios from "axios"
import { GetLoginKey, GetUsername } from "./App"

function NavigateUpload(){
	window.location.href = "/upload"
}

function NavigateFiles(){
	window.location.href = "/files"
}

function Home(){
	const [sharedUploadLink, setSharedLink] = useState("")

	function GenerateUploadLink(){
		axios.get("http://localhost:2048/createUploadLink", {
			params: {
			  USERNAME: GetUsername(),
			  LOGINKEY: GetLoginKey()
			}
		  }).then((response) => {
			console.log("Axios link response")
			console.log(response)
			setSharedLink("Sharable link: " + response.data)
		  })
	}	

	return (
		<div>
			<h1>
				HOME PAGE
			</h1>
			<button onClick={NavigateUpload}>Upload</button>
			<button onClick={NavigateFiles}>Files</button>
			<button onClick={GenerateUploadLink}>Generate upload link</button>
			{sharedUploadLink}
		</div>
	)
}

export default Home