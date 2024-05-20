import React, { useState } from "react"
import axios from "axios"
import { GetApiUrl, GetLoginKey, GetUsername } from "./App"
import FileTable from "./FileTable"

function Home(files){
	console.log("Files")
	console.log(files)

	const [sharedUploadLink, setSharedLink] = useState("")
	const [sharedLinkVisible, setSharedLinkVisible] = useState("hidden")

	function GenerateUploadLink(){
		axios.get(GetApiUrl()+"/createUploadLink", {
			params: {
			  USERNAME: GetUsername(),
			  LOGINKEY: GetLoginKey()
			}
		  }).then((response) => {
			console.log("Axios link response")
			console.log(response)
			setSharedLink(response.data)
			setSharedLinkVisible()
		  })
	}

	function NavigateToUpload(){
		window.location.href = "/upload"
	}

	return (
		<div>
			<div>
				<button className="homeButton" onClick={NavigateToUpload}>Upload File</button>
				<button className="homeButton" onClick={GenerateUploadLink}>Client Upload</button>
			</div>

			<div>
				<div className="sharedLinkText" style={{visibility: sharedLinkVisible}}>{sharedUploadLink}</div>
			</div>

			
			<FileTable files={files}></FileTable>
		</div>
	)	
}

export default Home