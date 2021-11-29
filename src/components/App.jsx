import React from 'react'
import { Redirect, Route, Routes, Switch } from 'react-router-dom'
import Navigation from './Navigation'
import TopicList from './TopicList'


function App() {

  return (
    <>
      <Navigation />
      <main>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<TopicList />} />
          </Routes>
        </div>
      </main>
    </>
  )
}


export default App