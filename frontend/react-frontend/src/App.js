import React from 'react'
import Login from './Login'
import Home from './Home'

var loginKey
function SetLoginKey(key){
  loginKey = key
  console.log("SET LOGIN KEY",key)
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
  }
  return (
    <>
      {page}
    </>
  )
}

export default App
export {SetLoginKey}