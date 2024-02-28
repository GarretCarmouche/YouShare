import React, { useState } from "react"
import axios from "axios"
import { GetApiUrl, GetLoginKey, GetUsername } from "./App"
import NavBar from "./NavBar"

function Home(){
	const [sharedUploadLink, setSharedLink] = useState("")

	function GenerateUploadLink(){
		axios.get(GetApiUrl()+"/createUploadLink", {
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
			<NavBar></NavBar>
			<div></div>
			<button onClick={GenerateUploadLink}>Generate upload link</button>
			{sharedUploadLink}
		</div>
	)
}

export default Home