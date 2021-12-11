import React, { useMemo } from 'react'
import Post from './Post'


function PostList({ posts, level, parent }) {

  const postRefs = useMemo(() => {
    const refs = {}
    posts.forEach(post => {
      refs[post.id] = React.createRef(null)
    })
    return refs
  }, [posts])

  const executeScroll = ref => {console.log(postRefs); console.log(ref)}//postRefs[ref].scrollIntoView({ behavior: 'smooth' })

  return (
    <div className={'topic_comments level-' + level}>
    {posts && posts.map(post => <Post 
      post={post} 
      level={level}
      parent={parent}
      key={post.id} 
      executeScroll={executeScroll}
      ref1={postRefs[post.id]}
    />)}    
    </div>
  )
}


export default PostList