import React, { useState } from 'react'
import Login from './Login'
import Home from './Home'
import FileUpload from './FileUpload'
import FileList from './FileList'
import axios from 'axios'

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

  axios.get("http://localhost:2048/getFileList", {
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
    case "/home":
      page = Home()
      break
    case "/upload":
      page = FileUpload()
      break
    case "/files":
      page = FileList(GetFiles())
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

export default App
export {SetLoginKey}
export {GetLoginKey}
export {SetUsername}
export {GetUsername}
export {GetFiles}
export {UpdateFiles}