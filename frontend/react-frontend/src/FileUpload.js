import React from "react"
import { useState } from "react"
import axios from "axios"
import { GetApiUrl, GetLoginKey, GetUsername, UpdateFiles } from "./App"
import NavBar from "./NavBar"

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
	
		console.log("UPLOADING FILE")
		console.log(fd)
		console.log(file)
		console.log("Name",file.name)
		console.log("Data",file.data)
		console.log("Size",file.size)
		console.log("Type",file.type)
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

		axios.get(GetApiUrl()+"/requestFileUpload", {
			params: {
				AUTH: "Login",
				USERNAME: GetUsername(),
				LOGINKEY: GetLoginKey(),
				FILENAME: file.name,
				FILESIZE: file.size,
				FILETYPE: file.type,
				FILEUPLOADER: username
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

	//Validate login info
	if(GetUsername() === null || GetLoginKey() === null){
		window.location.href = "/login"
	}
	
	return (
		<div>
			<NavBar></NavBar>
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