import axios from "axios"
import FileDownload from "js-file-download"
import React, { useState } from "react"

import { GetLoginKey, GetUsername } from "./App"

function FileItem(itemName){
	const [itemShareLink, setShareLink] = useState("")

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

	const shareItem = (event) => {
		event.preventDefault()
		console.log("Sharing", itemName)

		axios.get("http://localhost:2048/createDownloadLink", {
			params: {
				USERNAME: GetUsername(),
				LOGINKEY: GetLoginKey(),
				FILENAME: itemName,
			}
		}).then((response) => {
			console.log("Axios link response")
			console.log(response)
			setShareLink("Sharable link: " + response.data)
		})
	}

	return (
		<div>
			{itemName}
			<button onClick = {downloadItem}>Download</button>
			<button onClick = {shareItem}>Share</button>
			{itemShareLink}
		</div>
	)
}

export default FileItem