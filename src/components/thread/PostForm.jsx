import React, { useState } from 'react'
import setFormObject from '../common/FormUtils'


const initialData = {
    text: '',
}


function PostForm() {

    const [data, setData] = useState(initialData)
    const [errors, setErrors] = useState({})    

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    const validate = (data) => {
        const errors = {}

        if (!data.text) errors.text = 'Message cannot be blank'

            return errors
    }


    return (

        <form onSubmit={handleSubmit} className="post-form" id="postForm">
            <h2 className="mb-4">Reply</h2>

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
            <div class="text-center">
                <button type="submit" className="btn action_btn">Submit</button>
            </div>
        </form>

    )


}


export default PostForm