import React, { useState } from 'react'
import { connect } from 'react-redux'
import setFormObject from '../common/FormUtils'
import { addPost } from '../../api'
import InfoBlock from '../common/InfoBlock'


const initialData = {
    name: '',
}


function ThreadForm({ auth, counter }) {

    const [data, setData] = useState(initialData)
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()

        const errors = validate(data)
        setErrors(errors)

        if (Object.keys(errors).length === 0) {
            openThread({
                user_id: auth.id,
                name: data.name,
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
                    setErrors({auth:'You must be logged in to open a thread'})
                }
            })
        }

    }

    const validate = (data) => {
        const errors = {}

        if (!data.name) errors.name = 'Name cannot be blank';

        return errors
    }


    return (
        <form onSubmit={handleSubmit} className="post-form" id="postForm">
            <h2 className="mb-4">Open New Thread</h2>
            {Object.keys(errors).length > 0 && <InfoBlock errors={errors} />}
            <div className="form-group">
                <textarea
                    id="name"
                    rows="8"
                    className="form-control"
                    name="name"
                    placeholder="Your comment..."
                    value={data.name}
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

export default connect(mapStateToProps)(ThreadForm)
