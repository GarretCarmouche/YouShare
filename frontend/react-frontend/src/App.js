import React from 'react'
import Login from './Login'
import Home from './Home'
import FileUpload from './FileUpload'

var loginKey
var username

function GetUsername(){
  return username
}

function SetUsername(user){
  username = user
  console.log("SET USERNAME",username)
}

function SetLoginKey(key){
  loginKey = key
  console.log("SET LOGIN KEY",key)
}

function GetLoginKey(){
  return loginKey
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