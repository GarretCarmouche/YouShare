import React from 'react'
import Login from './Login'
import Home from './Home'
import FileUpload from './FileUpload'
import FileList from './FileList'
import axios from 'axios'
import DownloadSharedItem from './DownloadSharedItem'
import UploadFileFromLink from './UploadFileFromLink'
import UpdateLogin from './UpdateLogin'
import InvalidLink from './InvalidLink'

const ApiUrl = "/backend"

function GetApiUrl(){
  return ApiUrl
}

function GetUsername(){
  return sessionStorage.getItem("username")
}

function SetUsername(user){
  sessionStorage.setItem("username", user)
  console.log("SET USERNAME",user)
}

function SetLoginKey(key){
  sessionStorage.setItem("loginKey", key)
  console.log("SET LOGIN KEY",key)
}

function GetLoginKey(){
  return sessionStorage.getItem("loginKey")
}

async function UpdateFiles(){
  if (GetUsername() == null || GetLoginKey() == null){
    return
  }

  axios.get(GetApiUrl()+"/getFileList", {
    params: {
      USERNAME: GetUsername(),
      LOGINKEY: GetLoginKey()
    }
  }).then((response) => {
    console.log("Axios get files response")
    console.log(response)
    sessionStorage.setItem("filesList", JSON.stringify(response.data))
  })
}

function GetFiles(){
  var filesList = JSON.parse(sessionStorage.getItem("filesList"))
  console.log("Get files")
  console.log(filesList)
  return filesList
}

function App() {
  var page
  switch(window.location.pathname){
    case "/":
      page = Login()
      break
    case "/login":
      page = Login()
      break
    case "/updateLogin":
      page = UpdateLogin()
      break
    case "/home":
      page = Home()
      break
    case "/upload":
      page = FileUpload()
      break
    case "/files":
      page = FileList(GetFiles())
      break
    case "/downloadFileFromLink":
      page = DownloadSharedItem()
      break
    case "/uploadFileFromLink":
      page = UploadFileFromLink()
      break
    case "/invalidLink":
      page = InvalidLink()
      break
    default:
      page = Login()
      break
  }
  return (
    <>
      {page}
    </>
  )
}

UpdateFiles()

export default App
export {SetLoginKey}
export {GetLoginKey}
export {SetUsername}
export {GetUsername}
export {GetFiles}
export {UpdateFiles}
export {GetApiUrl}