import React, { useState } from "react"
import axios from "axios"
import { GetApiUrl, GetLoginKey, GetUsername, SetDomain } from "./App"
import FileTable from "./FileTable"

function Home(files, sourceDomain){
	console.log("Files, domain",files, sourceDomain)

	const [sharedUploadLink, setSharedLink] = useState("")
	const [sharedLinkVisible, setSharedLinkVisible] = useState("hidden")
	const [domain, setStateDomain] = useState(sourceDomain)	

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

	function UpdateDomain(){
		console.log("Update domain", domain)
		SetDomain(domain)
		setStateDomain(domain)
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

			<div className="domainSection">
				<>Your domain: </>
				<input
					className="domainField"
					type="text"
					value={domain}
					onChange={(event) => setStateDomain(event.target.value)}
				/>
				<button className="domainButton" onClick={UpdateDomain}>Update</button>
			</div>

			
			<FileTable files={files}></FileTable>
		</div>
	)	
}

export default Home