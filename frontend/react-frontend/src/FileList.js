import React from "react"
import {GetFiles} from "./App"
import FileItem from "./FileItem"

function FileList(){
	var files = GetFiles()

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