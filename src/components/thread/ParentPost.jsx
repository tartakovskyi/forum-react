import React from 'react'


function ParentPost({ post }) {

	return (
    <div className="parent-post">
      <span className="parent-post-title">Reply to: {post.user.login}</span>
      <div className="parent-post-content">
        <p>{post.text}</p>
      </div>
    </div>
  )
}


export default ParentPost