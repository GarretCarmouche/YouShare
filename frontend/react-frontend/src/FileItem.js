import axios from "axios"
import FileDownload from "js-file-download"
import React from "react"

import { GetLoginKey, GetUsername } from "./App"

function FileItem(itemName){
	const downloadItem = (event) => {
		event.preventDefault()
		console.log("Downloading", itemName)

		axios.get("http://localhost:2048/downloadFile", {
			params: {
			USERNAME: GetUsername(),
			LOGINKEY: GetLoginKey(),
			FILENAME: itemName,
			},

			responseType: "blob"
		}).then((response) => {
			console.log("Axios download response")
			console.log(response)
			FileDownload(response.data, itemName)
		})
	}

	return (
		<div>
			{itemName}
			<button onClick = {downloadItem}>Download</button>
		</div>
	)
}

export default FileItem