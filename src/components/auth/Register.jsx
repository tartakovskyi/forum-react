import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import InfoBlock from '../common/InfoBlock'
import setFormObject from '../common/FormUtils'


const initialData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
}


const Register = () => {
    const [data, setData] = useState(initialData)
    const [errors, setErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState('')
    let navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const errors = validate(data)
        setErrors(errors)

        if (Object.keys(errors).length === 0) {
            axios
                .post('/register', data)
                .then(function (response) {
                    setSuccessMessage(response.data.message)
                    navigate('/login', { replace: true })
                })
                .catch(function ({ response }) {
                    setErrors(response.data.errors)
                })
        }
    }

    const validate = (data) => {
        const errors = {}

        if (!data.name) errors.name = 'Name cannot be blank'
        if (!data.email) errors.email = 'Email cannot be blank'
        if (!data.password) errors.password = 'Password cannot be blank'
        if (!data.confirmPassword)
            errors.confirmPassword = 'Please, confirm password'
        //if (data.password != data.confirmPassword) errors.confirmPassword = 'password and confirmation should match'

        return errors
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-9 col-lg-6 col-xl-5">
                    <h1 className="text-center">Sign Up</h1>
                    {Object.keys(errors).length > 0 && (
                        <InfoBlock errors={errors} />
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                className={
                                    errors.name
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={setFormObject(data, setData)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-mail:</label>
                            <input
                                type="text"
                                className={
                                    errors.email
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
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
                                className={
                                    errors.password
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={setFormObject(data, setData)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">
                                Confirm Password:
                            </label>
                            <input
                                type="password"
                                className={
                                    errors.confirmPassword
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                id="confirmPassword"
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={setFormObject(data, setData)}
                            />
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

export default Register
