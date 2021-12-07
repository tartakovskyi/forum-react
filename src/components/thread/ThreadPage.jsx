import React, { useState, useEffect } from 'react'
import { useParams  } from 'react-router-dom'
import { getPosts } from '../../api'
import Title from '../common/Title'
import PostList from './PostList'


function ThreadPage() {

  const [posts, setPosts] = useState([])
  const [threadInfo, setThreadInfo] = useState([])
  let { id } = useParams();

  useEffect(() => {
    getPosts(id)
    .then(response => {
      console.log(response.data.posts)
      setThreadInfo(response.data.threadInfo)
      setPosts(response.data.posts)
    })
    .catch(error => {
      console.log(error)
    })
  }, [id])

  return (
    <>
      <Title title={threadInfo.title} />
      {posts && <PostList posts={posts} level="1" />}
    </>
  )
}


export default ThreadPage