import React from "react"
import FileItem from "./FileItem"

function FileList(files){
	console.log("File list page got files")
	console.log(files)

	return (
		<div>
			<h1>
				FILES
			</h1>
			<div>
				{files.map(function(item){
					return (FileItem(item))
				})}
			</div>
		</div>
	)
}

export default FileList