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
							var formattedSize = ""
							var size = val.FileSize
							if(size < 1000){
								formattedSize = size.toLocaleString(undefined, {maximumFractionDigits:2}) + "B"
							}else if(size < 1000000){
								formattedSize = (size / 1000).toLocaleString(undefined, {maximumFractionDigits:2}) + "KB"
							}else if(size < 1000000000){
								formattedSize = (size / 1000000).toLocaleString(undefined, {maximumFractionDigits:2}) + "MB"
							}else{
								formattedSize = (size / 1000000000).toLocaleString(undefined, {maximumFractionDigits:2}) + "GB"
							}

							var backgroundColor
							if(key % 2 === 0){
								backgroundColor = "rgb(255,255,255)"
							}else{
								backgroundColor = "rgb(200,200,200)"
							}
							
							return (
								<tr key = {key} style={{backgroundColor: backgroundColor}}>
									<td className="fileTableItem">{val.FileName}</td>
									<td className="fileTableItem">{val.Uploader}</td>
									<td className="fileTableItem">{val.UploadDate}</td>
									<td className="fileTableItem">{formattedSize}</td>
									<td className="fileTableItem">{val.FileType}</td>
									<td>
										<button className="fileItemButton">Delete</button>
										<button className="fileItemButton">Download</button>
										<button className="fileItemButton">Share</button>
									</td>
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