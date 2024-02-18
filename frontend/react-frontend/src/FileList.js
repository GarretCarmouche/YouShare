import React from "react"
import FileItem from "./FileItem"
import NavBar from "./NavBar"

function FileList(files){
	console.log("File list page got files")
	console.log(files)

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