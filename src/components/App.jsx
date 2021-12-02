import React from 'react'
import { Redirect, Route, Routes, Switch } from 'react-router-dom'
import Navigation from './Navigation'
import ThreadList from './ThreadList'


function App() {

  return (
    <>
      <Navigation />
      <main>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<ThreadList />} />
          </Routes>
        </div>
      </main>
    </>
  )
}


export default App