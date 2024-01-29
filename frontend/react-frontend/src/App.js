import React from 'react'
import Login from './Login'
import Home from './Home'
import FileUpload from './FileUpload'
import FileList from './FileList'

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

function GetFiles(){
  var files = ["test1.txt", "test2.txt", "test3.txt"]
  return files
}

function App() {
  var page
  switch(window.location.pathname){
    case "/":
      page = <Login />
      break
    case "/login":
      page = <Login />
      break
    case "/home":
      page = <Home />
      break
    case "/upload":
      page = <FileUpload />
      break
    case "/files":
      page = <FileList />
      break
    default:
      page = <Login />
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