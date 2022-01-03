import React, { useState } from 'react'
import { connect } from 'react-redux'
import setFormObject from '../common/FormUtils'
import { addPost } from '../../api'
import InfoBlock from '../common/InfoBlock'


const initialData = {
    text: '',
}


function PostForm({ auth, threadId, parent, counter }) {

    const [data, setData] = useState(initialData)
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()

        const errors = validate(data)
        setErrors(errors)

        if (Object.keys(errors).length === 0) {
            addPost({
                user_id: auth.id,
                thread_id: threadId,
                parent_id: parent ? parent.id : 0,
                text: data.text,
            })
            .then(function (response) {
                if (response.status === 200) {
                    setData(initialData)
                    counter()
                }
            })
            .catch(function (error) {
                console.log(error)
                if(error.response && error.response.data && error.response.data.errors) {
                    const errors = {}
                    Object.keys(error.response.data.errors).forEach(key => errors[key] = error.response.data.errors[key][0])
                    setErrors(errors)
                } else if(error.response && error.response.status && error.response.status === 401) {
                    setErrors({auth:'You must be logged in to post a comment'})
                }
            })
        }

    }

    const validate = (data) => {
        const errors = {}

        if (!data.text) errors.text = 'Post cannot be blank';

        return errors
    }


    return (
        <form onSubmit={handleSubmit} className="post-form" id="postForm">
            <h2 className="mb-4">Post Your Comment</h2>
            {Object.keys(errors).length > 0 && <InfoBlock errors={errors} />}
            {parent 
                &&
                <div className="parent-post">
                    <span className="parent-post-title">Reply to: {parent.user.login}</span>
                </div> 
            }
            <div className="form-group">
                <textarea
                    id="text"
                    rows="8"
                    className="form-control"
                    name="text"
                    placeholder="Your comment..."
                    value={data.text}
                    onChange={setFormObject(data, setData)}
                ></textarea>
            </div>
            <div className="text-center">
                <button type="submit" className="btn action_btn">Submit</button>
            </div>
        </form>
    )
}


const mapStateToProps = function ({ user }) {
  return {
    auth: user.auth,
  }
}

export default connect(mapStateToProps)(PostForm)
