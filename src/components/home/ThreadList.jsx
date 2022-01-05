import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Userpic from '../common/Userpic'


function ThreadList({ threads }) {

  return (
    <div className="community-posts-wrapper bb-radius">
    {threads && threads.map(thread => (
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
  )
}


export default ThreadList