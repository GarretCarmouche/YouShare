import React, { useState } from "react"
import axios from "axios"
import { GetApiUrl, GetLoginKey, GetUsername } from "./App"

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

			
			<div className="fileTable">
				<table>
					<thead>
						<tr>
							<th className="fileTableItem">File Name</th>
							<th className="fileTableItem">Uploaded By</th>
							<th className="fileTableItem">Date Uploaded</th>
							<th className="fileTableItem">File Size</th>
							<th className="fileTableItem">File Type</th>
						</tr>
					</thead>
					
					<tbody>
						{files.map((val, key) => {
							return (
								<tr key = {key}>
									<td className="fileTableItem">{val.FileName}</td>
									<td className="fileTableItem">{val.Uploader}</td>
									<td className="fileTableItem">{val.UploadDate}</td>
									<td className="fileTableItem">{val.FileSize}</td>
									<td className="fileTableItem">{val.FileType}</td>
									<td><button>Test button</button></td>
									<button>Tester button</button>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)	
}

export default Home