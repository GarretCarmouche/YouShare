import "./styles.css"
import React, { useState } from "react"
import axios from "axios"
import { GetApiUrl, GetLoginKey, GetUsername, UpdateFiles} from "./App"
import FileDownload from "js-file-download"

function FileListItem(props){
	console.log("File list item props");
	console.log(props);
	var val = props.val
	var key = props.index

	const [itemShareLink, setShareLink] = useState("")

	const deleteItem = (itemName) => {
		axios.get(GetApiUrl()+"/deleteFile", {
			params: {
				USERNAME: GetUsername(),
				LOGINKEY: GetLoginKey(),
				FILENAME: itemName,
			},
		}).then((response) => {
			console.log("Axios delete response")
			console.log(response)
			UpdateFiles().then(() => {
				window.location.reload()
			});
		})
	}

	const downloadItem = (itemName) => {
		axios.get(GetApiUrl()+"/downloadFile", {
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

	const shareItem = (itemName) => {
		axios.get(GetApiUrl()+"/createDownloadLink", {
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

	var formattedSize = ""
	var size = val.FileSize
	if(size < 1000){
		formattedSize = size.toLocaleString(undefined, {maximumFractionDigits:2}) + "B"
	}else if(size < 1000000){
		formattedSize = (size / 1000).toLocaleString(undefined, {maximumFractionDigits:2}) + "KB"
	}else if(size < 1000000000){
		formattedSize = (size / 1000000).toLocaleString(undefined, {maximumFractionDigits:2}) + "MB"
	}else{
		formattedSize = (size / 1000000000).toLocaleString(undefined, {maximumFractionDigits:2}) + "GB"
	}

	var backgroundColor
	if(key % 2 === 0){
		backgroundColor = "rgb(255,255,255)"
	}else{
		backgroundColor = "rgb(200,200,200)"
	}
	
	return (
		<tr key = {key} style={{backgroundColor: backgroundColor}}>
			<td className="fileTableItem">{val.FileName}</td>
			<td className="fileTableItem">{val.Uploader}</td>
			<td className="fileTableItem">{val.UploadDate}</td>
			<td className="fileTableItem">{formattedSize}</td>
			<td className="fileTableItem">{val.FileType}</td>
			<td>
				<button className="fileItemButton" onClick={() => deleteItem(val.FileName)}>Delete</button>
				<button className="fileItemButton" onClick = {() => downloadItem(val.FileName)}>Download</button>
				<button className="fileItemButton" onClick = {() => shareItem(val.FileName)}>Share</button>
				{itemShareLink}
			</td>
		</tr>
	)
}

export default FileListItem