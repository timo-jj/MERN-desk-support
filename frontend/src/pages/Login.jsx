import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'

import Spinner  from '../components/Spinner'

function Login() {
  // Data
  const [formData, setFormData ] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  // Store
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

  // Router
  const navigate = useNavigate()

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    // Redirect when logged in
    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch])

  // Methods
  const onChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value
    }))
  }

  // Methods
  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password
    }
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Log In
        </h1>
        <p>Please Log in to get support</p>

        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="enter your email"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="enter your password"
                required
              />
            </div>

            <div className="form-group">
              <button className="btn btn-block">Log In</button>
            </div>
          </form>
        </section>
      </section>
    </>
  )
}

export default Login