import React from 'react'
import Login from './Login'

var loginKey
function SetLoginKey(key){
  loginKey = key
  console.log("SET LOGIN KEY",key)
}

function App() {
  return Login()
}

export default App
export {SetLoginKey}