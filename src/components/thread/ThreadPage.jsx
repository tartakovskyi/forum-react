import React, { useRef, useState, useEffect } from 'react'
import { Link, useParams  } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts } from '../../api'
import InfoBlock from '../common/InfoBlock'
import Title from '../common/Title'
import PostList from './PostList'
import PostForm from './PostForm'
import ShowMoreBtn from '../common/ShowMoreBtn'


function ThreadPage({ auth }) {

  const [addedPostCounter, setAddedPostCounter] = useState(0)
  const [limit, setLimit] = useState(10)
  const [posts, setPosts] = useState([])
  const [replyingToPost, setReplyingToPost] = useState(null)
  const [threadInfo, setThreadInfo] = useState([])
  const ref = useRef()
  let { id } = useParams()

  useEffect(() => {
    getPosts(id, limit)
    .then(response => {
      setThreadInfo(response.data.threadInfo)
      setPosts(response.data.posts)
    })
    .catch(error => {
      console.log(error)
    })
  }, [id, addedPostCounter, limit])

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }, [replyingToPost])

  const counter = () => {
    setAddedPostCounter(addedPostCounter + 1)
  }

  const showMore = () => {
    setLimit(limit + 10)
  }

  return (
    <>
      <Title title={threadInfo.title} />
      {posts && <PostList posts={posts} setReplyingToPost={setReplyingToPost} level="1" />}

      {posts && posts.length < threadInfo.count && <ShowMoreBtn onClick={showMore} />}
      
      <div className="post-form-wrapper" ref={ref}>
        {auth === null
          ?
          <div className="alert alert-warning mt-5" role="alert">
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