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
      setThreads(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <>
      <h1>Threads</h1>
      <div className="community-posts-wrapper bb-radius">
      {threads.map((thread, index) => (
        <div className="community-post style-two" key={index}>
          <div className="post-content">
            <a href="" className="author-avatar">
              <img alt="" src="https://secure.gravatar.com/avatar/f0939a3e0da9cb1a963606d6f2e36c4f?s=40&amp;d=mm&amp;r=g"  class="avatar avatar-40 photo" loading="lazy" />
            </a>
            <div className="entry-content">
              <h3 className="post-title">
                <Link to={'/chat/' + thread.id}>
                  {thread.title}
                </Link>
              </h3>
              <ul class="meta">
              <li><i class="icon_calendar"></i> June 15, 2021 at 7:36 am</li>
              </ul>
            </div>            
          </div> 
        </div>        
      ))}
      </div>
    </>
  )
}


export default ThreadList