import React from "react"
import FileItem from "./FileItem"
import NavBar from "./NavBar"
import { GetLoginKey, GetUsername } from "./App"

function FileList(files){
	console.log("File list page got files")
	console.log(files)

	//Validate login info
	if(GetUsername() === null || GetLoginKey() === null){
		window.location.href = "/login"
	}
	
	return (
		<div>
			<NavBar></NavBar>
			<div>
				{files.map(function(item){
					return (FileItem(item))
				})}
			</div>
		</div>
	)
}

export default FileList