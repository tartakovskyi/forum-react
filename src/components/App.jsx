import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from './common/Navigation'
import ThreadList from './home/ThreadList'
import ThreadPage from './thread/ThreadPage'


function App() {

  return (
    <>
      <Navigation />
      <main>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<ThreadList />} />
            <Route path="/thread/:id" element={<ThreadPage />} />
          </Routes>
        </div>
      </main>
    </>
  )
}


export default App