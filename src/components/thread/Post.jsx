import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { hideModalAction, showModalAction } from '../../store/actions/modalAction'
import { destroyPost } from '../../api'
import { convertDate } from '../../helpers'
import Userpic from '../common/Userpic'
import ParentPost from './ParentPost'
import PostList from './PostList'


function Post({ auth, post, parent, counter, editPost, level, scrollToParent, hideModalAction, showModalAction }) {

  const newLevel = Number(level) + 1
  const date = convertDate(post.created_at)
  const ref = useRef()
  const [showChildren, setShowChildren] = useState(false)

  const executeScroll = () => ref.current.scrollIntoView({ behavior: 'smooth' })

  const toggleChildren = e => {
    e.preventDefault()
    setShowChildren(!showChildren)
  }

  const destroy = id => {
    destroyPost(id)
    .then(response => {
      if (response.status === 200 && response.data.status === 'success') {
        counter()
      }
      debugger
      hideModalAction()
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  const destroyPostModal = id => {
    showModalAction({
      text: 'Are you sure you want to delete the message?',
      btnConfirm: {
        text: 'Confirm',
        onClick: () => destroy(id)
      }
    })
  }

  return (
    <div className="forum-comment" ref={ref}>
      <div className="forum-post-top">
        <Userpic user={post.user} />
        <div className="forum-post-author">
          <a href={'/user/' + post.user.id} title={'View ' + post.user.login + '\'s profile'} className="bbp-author-link">
            <span className="bbp-author-name">{post.user.login}</span>
          </a>
          <div className="forum-author-meta">
            <div className="author-badge"><svg width="16px" height="15px"><use xlinkHref="/img/icons.svg#participant"></use></svg> {post.user.role.name}</div>
            <div className="author-badge"><i className="icon_calendar"></i> {date}</div>
          </div>
        </div> 
        <div className="forum-post-reply" >
          {auth && ((auth.id === post.user.id && !post.children) || auth.role_id === 1)  && <span className="link" onClick={() => destroyPostModal(post.id)}>Delete</span>}
          {auth && ((auth.id === post.user.id && !post.children) || auth.role_id === 1) && <span className="link" onClick={() => editPost(post, parent)}>Edit</span>} 
          {auth && <span className="link" onClick={() => editPost(null, post)}>Reply</span>}          
        </div>   
      </div>
      <div className="comment-content">
        {parent && <ParentPost post={parent} scrollToParent={scrollToParent} />}
        <p>{post.text}</p>
      </div>

      {post.children &&
        <>
          {showChildren
            ?
              <>
                <span onClick={e => toggleChildren(e)} className="link d-block mt-4">Hide replies</span>
                <PostList 
                  posts={post.children}
                  level={newLevel} 
                  parent={(newLevel > 3) ? post : null}
                  counter={counter}
                  editPost={editPost}
                  scrollToParent={executeScroll} 
                />
              </>
            :
              <span onClick={e => toggleChildren(e)} className="link d-block mt-4">{`View ${post.children.length} replies`}</span>
          } 
        </>
        
        
      }
    </div>
  )
}


const mapStateToProps = function ({ user }) {
  return { 
    auth: user.auth
  }
}


export default connect(mapStateToProps, { hideModalAction, showModalAction })(Post)