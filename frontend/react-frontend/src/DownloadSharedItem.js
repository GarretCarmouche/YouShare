import React from "react"
import axios from "axios"
import FileDownload from "js-file-download"

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

		axios.get("http://localhost:2048/downloadFileFromSharedLink", {
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