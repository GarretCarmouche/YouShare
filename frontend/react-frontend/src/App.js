import React from 'react'
import Login from './Login'
import Home from './Home'
import FileUpload from './FileUpload'

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