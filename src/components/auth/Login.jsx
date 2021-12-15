import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import InfoBlock from '../common/InfoBlock'
import setFormObject from '../common/FormUtils'


const initialData = {
    email: '',
    password: '',
    remember_me: false,
}

const Login = (props) => {
    const [data, setData] = useState(initialData)
    const [errors, setErrors] = useState({})
    let navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const errors = validate(data)
        setErrors(errors)

        if (Object.keys(errors).length === 0) {
            axios
                .post('/login', data)
                .then(function (response) {
                    localStorage.setItem('token', response.data.token)
                    props.setIsLogged(true)
                    navigate('/', { replace: true })
                })
                .catch(function (error) {
                    debugger
                    if (error.response.status === 401) {
                        setErrors({ credentials: 'Invalid login or password' })
                    }
                    console.log(error)
                })
        }
    }

    const validate = (data) => {
        const errors = {}

        if (!data.email) errors.email = 'Email cannot be blank'
        if (!data.password) errors.password = 'Password cannot be blank'

        return errors
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-9 col-lg-6 col-xl-5">
                    <h1 className="text-center">Sign In</h1>
                    {Object.keys(errors).length > 0 && (
                        <InfoBlock errors={errors} />
                    )}
                    {/*{props.location.state && props.location.state.success && (
                        <InfoBlock success={props.location.state.success} />
                    )}*/}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">E-mail:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={setFormObject(data, setData)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={setFormObject(data, setData)}
                            />
                        </div>
                        <div className="form-check mb-4">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="remember_me"
                                name="remember_me"
                                value={data.remember_me}
                                onChange={setFormObject(data, setData)}
                            />
                            <label
                                htmlFor="remember_me"
                                className="form-check-label"
                            >
                                Remember me
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-block btn-primary"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
