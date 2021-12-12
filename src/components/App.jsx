import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAuthAction, logoutAction } from '../store/actions/userAction'
import Navigation from './common/Navigation'
import ThreadList from './home/ThreadList'
import ThreadPage from './thread/ThreadPage'


function App({ isAuthData, getAuthAction, logoutAction }) {

  const [isLogged, setIsLogged] = useState(false)
  const [isAuthRequest, setIsAuthRequest] = useState(false)

  useEffect(() => {
      if (isAuthData !== true) {
          getAuthAction().finally(() => setIsAuthRequest(true))
      }
  }, [isAuthData, isLogged])

  const logout = () => {
      localStorage.removeItem('token')
      logoutAction()
      setIsLogged(false)
  }

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


const mapStateToProps = function ({ user }) {
    return {
        //isAuthData: user.isAuthData,
        isAuthData: false
    }
}

export default connect(mapStateToProps, { getAuthAction, logoutAction })(App)