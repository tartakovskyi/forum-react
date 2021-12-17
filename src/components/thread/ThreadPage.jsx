import React, { useState, useEffect } from 'react'
import { useParams  } from 'react-router-dom'
import { getPosts } from '../../api'
import Title from '../common/Title'
import PostList from './PostList'
import PostForm from './PostForm'


function ThreadPage() {

  const [posts, setPosts] = useState([])
  const [threadInfo, setThreadInfo] = useState([])
  const [replyingToPost, setReplyingToPost] = useState(null)
  let { id } = useParams()

  useEffect(() => {
    getPosts(id)
    .then(response => {
      setThreadInfo(response.data.threadInfo)
      setPosts(response.data.posts)
    })
    .catch(error => {
      console.log(error)
    })
  }, [id])

  const reply = post => {
    setReplyingToPost(post)
  }

  return (
    <>
      <Title title={threadInfo.title} />
      {posts && <PostList posts={posts} setReplyingToPost={setReplyingToPost} level="1" />}
      <PostForm threadId={threadInfo.id} parent={replyingToPost} />
    </>
  )
}


export default ThreadPage