import React from 'react'
import Login from './Login'
import Home from './Home'
import FileUpload from './FileUpload'
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
  if(user === null){
    sessionStorage.removeItem("username");
  }else{
    sessionStorage.setItem("username", user)
  }
  
  console.log("SET USERNAME",user)
}

function SetLoginKey(key){
  if(key === null){
    sessionStorage.removeItem("loginkey");
  }else{
    sessionStorage.setItem("loginKey", key);
  }
  
  console.log("SET LOGIN KEY",key)
}

function GetLoginKey(){
  return sessionStorage.getItem("loginKey")
}

async function SetDomain(domain){
  console.log("Set domain",domain)
  axios.post(GetApiUrl()+"/setDomain", {}, {
    params: {
      USERNAME: GetUsername(),
      LOGINKEY: GetLoginKey(),
      DOMAIN: domain,
    }
  })
}

async function GetDomain(){
  console.log("Get domain")
  var domain
  await axios.get(GetApiUrl()+"/getDomain", {
    params: {
      USERNAME: GetUsername(),
      LOGINKEY: GetLoginKey()
    }
  }).then((response) => {
    console.log("GetDomain response",response)
    domain = response.data
  })

  return domain
}

async function UpdateFiles(){
  if (GetUsername() == null || GetLoginKey() == null){
    return
  }

  await axios.get(GetApiUrl()+"/getFileList", {
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

var domain = await GetDomain()
await UpdateFiles();

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
      page = Home(GetFiles(), domain)
      break
    case "/upload":
      page = FileUpload()
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
export {SetDomain}
export {GetDomain}