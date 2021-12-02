import React, { useState, useEffect } from 'react'
import axios from 'axios'


axios.defaults.baseURL = 'http://forum.loc/api/'


function TopicList() {

  const [threads, setThreads] = useState([])

  useEffect(() => {
    axios
    .get('/thread')
    .then(response => {
      setThreads(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <>
      <h1>Test</h1>
    </>
  )
}


export default TopicList