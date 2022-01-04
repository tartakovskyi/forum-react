import React, { useRef, useState } from 'react'
import { Link  } from 'react-router-dom'
import { convertDate } from '../../helpers'
import Userpic from '../common/Userpic'
import ParentPost from './ParentPost'
import PostList from './PostList'


function Post({ post, level, setReplyingToPost, scrollToParent, parent }) {

  const newLevel = Number(level) + 1
  const date = convertDate(post.created_at)
  const ref = useRef()
  const [showChildren, setShowChildren] = useState(false)

  const executeScroll = () => ref.current.scrollIntoView({ behavior: 'smooth' })

  const toggleChildren = e => {
    e.preventDefault()
    setShowChildren(!showChildren)
  }

  return (
    <div className="forum-comment" ref={ref}>
      <div className="forum-post-top">
        <Userpic user={post.user} />
        <div className="forum-post-author">
          <a href={'/user/dylan/' + post.user.id} title={'View ' + post.user.login + '\'s profile'} className="bbp-author-link">
            <span className="bbp-author-name">{post.user.login}</span>
          </a>
          <div className="forum-author-meta">
            <div className="author-badge"><svg width="16px" height="15px"><use xlinkHref="/img/icons.svg#participant"></use></svg> {post.user.role.name}</div>
            <div className="author-badge"><i className="icon_calendar"></i> {date}</div>
          </div>
        </div> 
        <div className="forum-post-reply" >
          <Link to="#" onClick={() => setReplyingToPost(post)}>Reply</Link>
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
                <a href="#" onClick={e => toggleChildren(e)} className="d-block mt-4">Hide replies</a>
                <PostList 
                  posts={post.children}
                  level={newLevel} 
                  parent={(newLevel > 3) ? post : null} 
                  scrollToParent={executeScroll} 
                  setReplyingToPost={setReplyingToPost} 
                />
              </>
            :
              <a href="#" onClick={e => toggleChildren(e)} className="d-block mt-4">{`View ${post.children.length} replies`}</a>
          } 
        </>
        
        
      }
    </div>
  )
}


export default Post