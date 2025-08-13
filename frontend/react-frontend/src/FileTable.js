import React from "react"
import FileListItem from "./FileListItem"

function FileTable(props){
	const files = props.files

	if(files === null){
		return (
			<div>

			</div>
		)
	}
	
	return (
		<div className="fileTable">
			<table>
				<thead>
					<tr>
						<th className="fileTableItem">File Name</th>
						<th className="fileTableItem">Uploaded By</th>
						<th className="fileTableItem">Date Uploaded</th>
						<th className="fileTableItem">File Size</th>
						<th className="fileTableItem">File Type</th>
					</tr>
				</thead>
				
				<tbody>
					{
					files.map((val, key) => {
						return (<FileListItem val={val} index={key}></FileListItem>)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default FileTable