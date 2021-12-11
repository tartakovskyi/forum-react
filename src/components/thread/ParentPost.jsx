import React from 'react'


function ParentPost({ post, executeScroll }) {

	return (
    <div className="parent-post" onClick={() => executeScroll(post.id)}>
      <span className="parent-post-title">Reply to: {post.user.login}</span>
      <div className="parent-post-content">
        <p>{post.text}</p>
      </div>
    </div>
  )
}


export default ParentPost