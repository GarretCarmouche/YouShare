import React from "react"
import { useState } from "react"
import axios from "axios"
import { GetLoginKey, GetUsername, UpdateFiles } from "./App"

function FileUpload(){
	const [file, setFile] = useState(null)
	const [uploadDebounce, setUploadDebounce] = useState(false)
	const [uploadProgress, setUploadProgress] = useState("")

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
		var username = GetUsername()
		var loginKey = GetLoginKey()
	
		const fd = new FormData()
		fd.append("file", file)
		fd.append("username", username)
		fd.append("loginKey", loginKey)
	
		console.log("UPLOADING FILE")
		console.log(fd)
		console.log(file)
		console.log(file.name)
		console.log(file.data)
		console.log(username)
		console.log(loginKey)

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

		axios.post("http://localhost:2048/uploadFile", fd, config).then(function(response){
			console.log(response)
			UpdateFiles()
		}).catch(function(error){
			console.log(error)
		})
	}

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

export default FileUpload