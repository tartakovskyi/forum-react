import React from 'react'
import Post from './Post'


function PostList({ posts, level, parent, scrollToParent }) {


  return (
    <div className={'topic_comments level-' + level}>
    {posts && posts.map(post => <Post 
      post={post} 
      level={level}
      parent={parent}
      key={post.id} 
      scrollToParent={scrollToParent}
    />)}    
    </div>
  )
}


export default PostList