import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Userpic from '../common/Userpic'


axios.defaults.baseURL = 'http://forum.loc/api/'


function ThreadList() {

  const [threads, setThreads] = useState([])

  useEffect(() => {
    axios
    .get('/thread')
    .then(response => {
      let treadsArr = response.data.map(threadObj => {
        threadObj.created_at = convertDate(threadObj.created_at)
        return threadObj
      })
      setThreads(treadsArr)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  const convertDate = string => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(string)

    return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' at ' + date.getHours() + ':' + date.getMinutes()
  } 

  return (
    <>
      <h1>Threads</h1>
      <div className="community-posts-wrapper bb-radius">
      {threads.map(thread => (
        <div className="community-post style-two" key={thread.id}>
          <div className="post-content">
            <Userpic user={thread.user} />
            <div className="entry-content">
              <h3 className="post-title">
                <Link to={'/thread/' + thread.id}>
                  {thread.title}
                </Link>
              </h3>
              <ul className="meta">
                <li><i className="icon_calendar"></i> {thread.created_at}</li>
              </ul>
            </div>            
          </div>
          <div className="post-meta-wrapper">
            <ul className="post-meta-info">
              <li className="post-meta-count">
                <Link to={'/thread/' + thread.id}>
                  <i className="icon_chat_alt"></i> {thread.posts_count}
                </Link>
              </li>
            </ul>            
          </div>
        </div>        
      ))}
      </div>
    </>
  )
}


export default ThreadList