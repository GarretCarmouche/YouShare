import React from "react"
import axios from "axios"
import FileDownload from "js-file-download"
import { GetApiUrl } from "./App"

function DownloadSharedItem(){
	console.log(window.location)
	var search = window.location.search

	var fileName = search.match("file=.*&")[0]
	fileName = fileName.substring(5, fileName.length - 1)

	var downloadKey = search.match("key=.*")[0]
	downloadKey = downloadKey.substring(4)

	console.log(fileName, "with key", downloadKey)


	const downloadItem = (event) => {
		event.preventDefault()
		console.log("Downloading", fileName)

		axios.get(GetApiUrl()+"/downloadFileFromSharedLink", {
			params: {
				FILENAME: fileName,
				KEY: downloadKey
			},

			responseType: "blob"
		}).then((response) => {
			console.log("Axios download response")
			console.log(response)
			FileDownload(response.data, fileName)
		})
	}

	//Validate the download key, redirect
	axios.get(GetApiUrl()+"/validateDownloadKey", {
		params: {
			FILENAME: fileName,
			KEY: downloadKey
		}
	}).then((response) => {
		if(response.data === false){
			window.location = "/invalidLink"
		}
	})

	return (
		<div>
			<h1>
				DOWNLOAD SHARED ITEM
			</h1>
			<div>
				{fileName}
				<button onClick = {downloadItem}>Download</button>
			</div>
		</div>
	)
}

export default DownloadSharedItem