import React from "react"
import { useState } from "react"
import axios from "axios"
import { GetApiUrl, UpdateFiles } from "./App"

function UploadFileFromLink(){
	const [file, setFile] = useState(null)
	const [uploadDebounce, setUploadDebounce] = useState(false)
	const [uploadProgress, setUploadProgress] = useState("")

	console.log(window.location)
	var search = window.location.search

	var key = search.match("key=.*")[0]
	key = key.substring(4, key.length)

	function submit(){
		if (!file){
			console.log("No file selected")
			return
		}
	
		if (uploadDebounce){
			console.log("Upload debounce")
			return
		}
		
		setUploadDebounce(true)
	
		const fd = new FormData()
		fd.append("file", file)
		fd.append("key", key)
	
		console.log("UPLOADING FILE")
		console.log(fd)
		console.log(file)
		console.log(file.name)
		console.log(file.data)

		const config = {
			onUploadProgress: function(progressEvent){
				if(progressEvent.loaded === progressEvent.total){
					setUploadProgress("Upload Complete")
				}else{
					var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
					console.log(percentCompleted)
					setUploadProgress("Progress: " + percentCompleted + "%")
				}
			}
		}

		axios.get(GetApiUrl()+"/requestFileUpload", {
			params: {
				AUTH: "SharedKey",
				KEY: key,
				FILENAME: file.name,
				FILESIZE: file.size,
				FILETYPE: file.type,
				FILEUPLOADER: "Guest",
			}
		}).then((response) => {
			console.log("Axios request upload response")
			console.log(response)
			
			if(response.data !== false){
				axios.post(GetApiUrl()+"/uploadFile"+response.data, fd, config).then(function(response){
					console.log(response)
					UpdateFiles()
				}).catch(function(error){
					console.log(error)
				})
			}
		})
	}

	//Validate upload key
	axios.get(GetApiUrl()+"/validateUploadKey", {
		params: {
			KEY: key
		}
	}).then((response) => {
		if (response.data === false){
			window.location = "/invalidLink"
		}
	})

	return (
		<div>
			<h1>
				UPLOAD PAGE
			</h1>
			<div>
				<input onChange={ (e) => {setFile(e.target.files[0])} } type="file" />
				<button onClick = {submit}>Upload</button>
			</div>
			<div>
				{uploadProgress}
			</div>
		</div>
	)
}

export default UploadFileFromLink