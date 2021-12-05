import React from 'react'
import Userpic from '../common/Userpic'
import PostList from './PostList'


function Post({ post, level }) {

  const newLevel = Number(level) +1

  return (
    <div className="forum-comment">
    <div className="forum-post-top">
      <Userpic user={post.user} />      
    </div>
      {post.id}
      {post.children && <PostList posts={post.children} level={newLevel} />}
    </div>
  )
}


export default Post