import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


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
    const date = new Date(string.created_at)
    return date.toDateString() //+ ' ' + date.getHours() + ':' + date.getMinutes()
  } 

  return (
    <>
      <h1>Threads</h1>
      <div className="community-posts-wrapper bb-radius">
      {threads.map((thread, index) => (
        <div className="community-post style-two" key={index}>
          <div className="post-content">
            <a href="" className="author-avatar">
              <img alt="" src="https://secure.gravatar.com/avatar/f0939a3e0da9cb1a963606d6f2e36c4f?s=40&amp;d=mm&amp;r=g"  className="avatar photo" loading="lazy" />
            </a>
            <div className="entry-content">
              <h3 className="post-title">
                <Link to={'/chat/' + thread.id}>
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
                <Link to={'/chat/' + thread.id}>
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