import React, { useRef, useState, useEffect } from 'react'
import { Link, useParams  } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts } from '../../api'
import InfoBlock from '../common/InfoBlock'
import Title from '../common/Title'
import PostList from './PostList'
import PostForm from './PostForm'


function ThreadPage({ auth }) {

  const [posts, setPosts] = useState([])
  const [threadInfo, setThreadInfo] = useState([])
  const [replyingToPost, setReplyingToPost] = useState(null)
  const [addedPostCounter, setAddedPostCounter] = useState(0)
  const ref = useRef()
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
  }, [id, addedPostCounter])

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }, [replyingToPost])

  const counter = () => {
    setAddedPostCounter(addedPostCounter + 1)
  }

  return (
    <>
      <Title title={threadInfo.title} />
      {posts && <PostList posts={posts} setReplyingToPost={setReplyingToPost} level="1" />}
      
        <div className="post-form-wrapper" ref={ref}>
          {auth === null
            ?
            <div className="alert alert-warning" role="alert">
                You must be <Link to='/login'>logged in</Link> to post a comment
            </div>
            :
            <PostForm threadId={threadInfo.id} parent={replyingToPost} counter={counter} />
          }
        </div>
    </>
  )
}


const mapStateToProps = function ({ user }) {
  return { 
    auth: user.auth
  }
}

export default connect(mapStateToProps)(ThreadPage)